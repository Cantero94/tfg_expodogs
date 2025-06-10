import { Exposicion } from "../models/Exposicion.js";
import { Usuario } from "../models/Usuario.js";

import bcrypt from "bcrypt";
import moment from "moment";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { Op } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Página de inicio
const paginaInicio = async (req, res) => {
  try {
    //const exposiciones = await Exposicion.findAll({ order: [["fecha", "DESC"]] });

    // Obtener solo exposiciones próximas para carrusell
    const hoy = moment(res.locals.hoy).format("YYYY-MM-DD");
    const exposiciones = await Exposicion.findAll({
      where: {
        fecha: { [Op.gt]: hoy }, // Operador de Sequelize mayor que, gt=GreateThan
      },
      order: [["fecha", "ASC"]],
    });

    // Mandamos los errores y mensajes a la vista guardados en la sesión
    const errores = req.session.errores || [];
    const mensaje = req.session.mensaje || "";
    req.session.errores = [];
    req.session.mensaje = "";

    res.render("paginaInicio", {
      pagina: "Inicio",
      exposiciones,
      usuario: req.session.usuario || null,
      mensaje,
      errores,
      moment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("BCK: Error con el servidor.");
  }
};

const registrarUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      dni,
      email,
      password,
      password2,
      telefono1,
      telefono2,
      direccion,
      cp,
      ciudad,
      provincia,
      pais,
    } = req.body;

    // Validar todos los datos antes de procesar
    const errorValidacion = validarDatosRegistro({
      nombre,
      apellidos,
      dni,
      email,
      password,
      password2,
      telefono1,
      telefono2,
      direccion,
      cp,
      ciudad,
      provincia,
      pais,
    });

    if (errorValidacion) {
      // Error 400 cuando se recibe una solicitud mal formada.
      // Mandamos en formato json el objeto error con errorValidacion como valor.
      // Si hay varios errores se manda solo el primero, aunque se podría haber mandado un array, he decidido hacerlo así para prevenir malas intenciones al que ha deshabilitado las validaciones en el cliente.
      return res.status(400).json({ error: errorValidacion });
    }

    // Verificar si el usuario ya existe, despues de validar los datos
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      console.log("❌ Error: El correo ya está registrado.");
      // Error 400 cuando se recibe una solicitud mal formada.
      // Mandamos en formato json para que el modal error pueda leerlo.
      return res
        .status(400)
        .json({
          error:
            "BCK: El correo ya está registrado. Si no recuerda su contraseña puede recuperarla haciendo click en '¿Olvidaste tu contraseña?'",
        });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generamos un nuevo token de verificación, de momento no verifico que exista por que la posibilidad de que se repita es practicamente 0, pero en un futuro se podría hacer.
    const tokenVerificacion = crypto.randomBytes(32).toString("hex");

    // Crear usuario en la base de datos
    await Usuario.create({
      nombre,
      apellidos,
      dni,
      email,
      password: hashedPassword,
      telefono1,
      telefono2,
      direccion,
      cp,
      ciudad,
      provincia,
      pais,
      activo: false,
      baneado: false,
      token_verificacion: tokenVerificacion,
    });

    // Enviar correo de confirmación con el token de forma asíncrona
    await enviarCorreoConfirmacion(email, nombre, tokenVerificacion);

    console.log("✅ Usuario registrado correctamente.");
    res
      .status(200) // 200 OK para cuando comprobamos con if (response.ok) en cliente
      .json({ mensaje: "Hemos enviado un correo electrónico con un enlace para activar tu cuenta. Por favor, revisa tu bandeja de entrada. Si no lo ha recibido, comprueba la bandeja de spam." });
  } catch (error) {
    console.error("❌ Error en registrarUsuario:", error);
    return res
      .status(500)
      .json({ error: "BCK: Error en el servidor. Inténtalo nuevamente." });
  }
};

// Función para validar todos los datos
const validarDatosRegistro = (datos) => {
  const {
    nombre,
    apellidos,
    dni,
    email,
    password,
    password2,
    telefono1,
    telefono2,
    direccion,
    cp,
    ciudad,
    provincia,
    pais,
  } = datos;

  // 🔹 Validar campos obligatorios del formulario
  const camposObligatorios = {
    nombre,
    apellidos,
    dni,
    email,
    password,
    password2,
    telefono1,
    direccion,
    cp,
    ciudad,
    provincia,
    pais,
  };
  // Recorremos el objeto camposObligatorios convirtiendo cada propiedad en un array de arrays con dos elementos, el nombre de la propiedad y el valor de la propiedad mediante el método Object.entries().
  for (const [campo, valor] of Object.entries(camposObligatorios)) {
    if (!valor || valor.trim() === "") {
      // Como decía antes, si hay varios errores se manda solo el primero que encuentra cortando con return.
      return `BCK: El campo ${campo.toUpperCase()} es obligatorio.`;
    }
  }

  // 🔹 Validar contraseñas
  if (password !== password2) {
    return "BCK: Las contraseñas no coinciden.";
  }
  if (password.length < 6) {
    return "BCK: La contraseña debe tener al menos 6 caracteres.";
  }

  // 🔹 Validar teléfono
  // Expresión regular para teléfonos
  const telefonoRegex = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}$/;
  // Utilizamos el método test() de las expresiones regulares que comprueba si el teléfono1 cumple con la expresión regular.
  if (!telefonoRegex.test(telefono1)) { 
    return "BCK: El número de Teléfono 1 no es válido.";
  }
  // Teléfono2 es opcional, por lo que si existe hay que comprobarlo.
  if (telefono2 && !telefonoRegex.test(telefono2)) {
    return "BCK: El número de Teléfono 2 no es válido.";
  }

  // 🔹 Validar DNI/NIE/Pasaporte
  // Creamos varias expresiones regulares para DNI, NIE y pasaporte.
  const dniRegex = /^\d{8}[A-Z]$/; // DNI Español
  const nieRegex = /^[XYZ]\d{7}[A-Z]$/; // NIE Español
  const extranjeroRegex = /^[A-Z0-9]{6,20}$/i; // Pasaporte o ID extranjero
  const letraFinal = dni.slice(-1);
  const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";

  // Si es un DNI, validar la letra
  if (dniRegex.test(dni)) {
    const numero = dni.slice(0, -1);
    const letraCalculada = letrasValidas[numero % 23];
    
    if (letraFinal !== letraCalculada) {
      return "BCK: La letra del DNI no es válida.";
    }
    // Si es un NIE, convertir la letra inicial y validar
  } else if (nieRegex.test(dni)) {
    let numero = dni.slice(1, -1);
    const letraInicial = dni[0];

    if (letraInicial === "X") numero = "0" + numero;
    if (letraInicial === "Y") numero = "1" + numero;
    if (letraInicial === "Z") numero = "2" + numero;

    const letraCalculada = letrasValidas[parseInt(numero) % 23];

    if (letraFinal !== letraCalculada) {
      return "BCK: La letra del NIE no es válida.";
    }
  } else if (!extranjeroRegex.test(dni)) {
    // Si no es ni DNI, ni NIE, ni pasaporte válido, mostrar error
    return "BCK: El DNI/NIE/Pasaporte no es válido.";
  }

  return null; // Si todo está bien, no hay errores
};

// Función para enviar correo de confirmación
const enviarCorreoConfirmacion = async (email, nombre, tokenVerificacion) => {
  try {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "localhost",
        port: parseInt(process.env.SMTP_PORT, 10) || 587,      // 587 para STARTTLS
        secure: false,                                         // no SMTPS; usaremos STARTTLS
        requireTLS: true,                                      // exigir cifrado
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          // En entornos Plesk internos, a veces el certificado no es de una CA pública.
          // Con esto evitamos que nodemailer rechace la conexión por "self-signed".
          rejectUnauthorized: false
        }
    });

    const mailOptions = {
      from: `"Expodogs" <info@canterodev.es>`,
      to: email,
      subject: "Confirma tu cuenta en Expodogs",

      html: `
            <div style="font-family: Arial, sans-serif; width:50%; margin:0 auto;">
            <div style="background-color: #212529; padding: 20px; border-radius: 10px; text-align: center;">
            <img src="http://expodogs.es/media/img/logo.png" alt="Expodogs Logo" style="width: 50%;">
            </div>
            <h1 style="text-align: center;">Hola, ${nombre}</h1>
            <div style="padding: 0px 20px; text-align: center;">
            <p style="text-align: left;">Gracias por registrarte en Expodogs. Para activar tu cuenta, haz clic en el siguiente enlace:</p>
            <a href="https://expodogs.canterodev.es/verificar-cuenta?token=${tokenVerificacion}" 
            style="display: inline-block; background-color: #212529; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Activar mi cuenta
            </a>
            </div>
            </div>
            `,
      //🔹 Cambiar la URL de producción en el enlace
      // <a href="https://tfg-expodogs.onrender.com/verificar-cuenta?token=${tokenVerificacion}"
      // <a href="http://localhost:4000/verificar-cuenta?token=${tokenVerificacion}"
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Correo de confirmación enviado a:", email);
  } catch (error) {
    console.error("❌ Error enviando el correo:", error);
  }
};

// Función para verificar la cuenta con el enlace del correo
const verificarCuenta = async (req, res) => {
  try {
    const { token } = req.query;

    // Buscar al usuario con el token
    const usuario = await Usuario.findOne({
      where: { token_verificacion: token },
    });

    if (!usuario) {
      // Almacenamos el error en la sesión para mostrarlo con el modal errorModal.
      req.session.errores = ["Enlace inválido o cuenta ya activada."];
      console.log("❌ Error guardado en sesión:", req.session.errores);
      
      // Guardar sesión antes de redirigir
      req.session.save(() => {
        return res.redirect("/");
      });
      return;
    }

    // Activamos la cuenta y eliminamos el token en la base de datos
    await Usuario.update(
      { activo: true, token_verificacion: null },
      { where: { id_usuario: usuario.id_usuario } }
    );
    // Almacenamos los datos del usuario en la sesión para que pueda iniciar sesión automáticamente.
    req.session.usuario = {
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      email: usuario.email,
    };
    // Almacenamos el mensaje en la sesión para mostrarlo con el modal mensajeModal.
    req.session.mensaje = "Su cuenta ha sido activada correctamente. ¡Bienvenido!";
    
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor.");
  }
};


// Función para iniciar sesión
const loginUsuario = async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    // Aquí si almacenamos los errores para mandarlos todos de una tacada.
    let errores = [];
    // 🔹Comprobamos que los campos no estén vacíos.
    if (!email || !password) {
      errores.push("Correo y contraseña son obligatorios.");
    } else {
      const usuario = await Usuario.findOne({ where: { email } });
      // 🔹Comprobamos que el usuario existe, que está activo y que no está baneado.
      if (!usuario) {
        errores.push("El correo no está registrado.");
      } else if (!usuario.activo) {
        errores.push("Tu cuenta aún no está activada. Revisa tu correo.");
      } else if (usuario.baneado) {
        errores.push("Tu cuenta ha sido bloqueada.");
      } else {
        // 🔹Comprobamos que la contraseña es correcta con el método compare de bcrypt que compara la contraseña introducida con la contraseña hasheada.
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
          errores.push("Contraseña incorrecta.");
        } else {
          console.log("✅ Usuario autenticado:", usuario.email);
          req.session.usuario = {
            id: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email,
          };
          // 🔐 Guardamos la sesión en una cookie si el usuario ha hecho click en mantener sesión.
          if (remember === "on") {
            // 30 días
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
          } else {
            // Solo sesión actual (se borra al cerrar navegador)
            req.session.cookie.expires = false;
          }
        }
      }
    }

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    console.log("📌 Sesión guardada:", req.session.usuario);
    return res.status(200).json({ mensaje: "Sesión iniciada correctamente." });
  } catch (error) {
    console.error("❌ Error en loginUsuario:", error);
    return res
      .status(500)
      .json({ errores: ["Error en el servidor. Inténtalo nuevamente."] });
  }
};

// Función para cerrar sesión
const logoutUsuario = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("❌ Error al cerrar sesión:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.redirect("/");
  });
};

// Función para recordar la contraseña
const recordarPassUsuario = async (req, res) => {
  try {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ errores: "Este correo no está registrado." });
    }

    const tokenVerificacion = crypto.randomBytes(32).toString("hex");
    
    await Usuario.update(
      { token_verificacion: tokenVerificacion },
      { where: { email } }
    );

    // Enviamos un correo con enlace para restablecer la contraseña
    await enviarCorreoRestablecer(email, usuario.nombre, tokenVerificacion);

    console.log(`📧 Enlace de recuperación enviado a: ${email}`);
    return res
      .status(200)
      .json({ mensaje: "Se ha enviado un correo con instrucciones para restablecer tu contraseña. Revisa tu bandeja de entrada." });
  } catch (error) {
    console.error("❌ Error en recordarPassUsuario:", error);
    return res
      .status(500)
      .json({ error: "Error en el servidor. Inténtalo nuevamente." });
  }
};

// Función para enviar correo de restablecimiento de contraseña
const enviarCorreoRestablecer = async (email, nombre, token) => {
  try {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "localhost",
        port: parseInt(process.env.SMTP_PORT, 10) || 587,      // 587 para STARTTLS
        secure: false,                                         // no SMTPS; usaremos STARTTLS
        requireTLS: true,                                      // exigir cifrado
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          // En entornos Plesk internos, a veces el certificado no es de una CA pública.
          // Con esto evitamos que nodemailer rechace la conexión por "self-signed".
          rejectUnauthorized: false
        }
    });

    const mailOptions = {
      from: `"Expodogs" <info@canterodev.es>`,
      to: email,
      subject: "Restablecimiento de contraseña en Expodogs",
      html: `
            <div style="font-family: Arial, sans-serif; width:50%; margin:0 auto;">
            <div style="background-color: #212529; padding: 20px; border-radius: 10px; text-align: center;">
            <img src="http://expodogs.es/media/img/logo.png" alt="Expodogs Logo" style="width: 50%;">
            </div>
            <h1 style="text-align: center;">Hola, ${nombre}</h1>
            <div style="padding: 0px 20px; text-align: center;">
            <p style="text-align: left;">Hemos recibido una solicitud para restablecer tu contraseña. 
            Si no has solicitado esto, ignora este correo. Para continuar, haz clic en el siguiente enlace:</p>
            <a href="https://expodogs.canterodev.es/restablecer-password?token=${token}"
            style="display: inline-block; background-color: #212529; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Restablecer contraseña
            </a>
            </div>
            </div>
            `,
      //🔹 Cambiar la URL de producción en el enlace
      //<a href="https://tfg-expodogs.onrender.com/restablecer-password?token=${token}"
      //<a href="http://localhost:4000/restablecer-password?token=${token}"
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Correo de recuperación enviado a:", email);
  } catch (error) {
    console.error("❌ Error enviando el correo de recuperación:", error);
  }
};

// Función para restablecer la contraseña con el enlace del correo de recuperación
const restablecerPassword = async (req, res) => {
  try {
    const { token } = req.query;

    const usuario = await Usuario.findOne({
      where: { token_verificacion: token },
    });

    if (!usuario) {
      req.session.errores = ["Enlace inválido o ya utilizado."];
      console.log("❌ Intento de uso de token inválido");
      return req.session.save(() => res.redirect("/"));
    }

    // Restablecer la contraseña a 123456 y activar la cuenta si no estaba activada
    const hashedPassword = await bcrypt.hash("123456", 10);
    await Usuario.update(
      { password: hashedPassword, token_verificacion: null, activo: true },
      { where: { id_usuario: usuario.id_usuario } }
    );

    // Iniciar sesión automáticamente
    req.session.usuario = {
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      email: usuario.email,
    };
    // Guardamos el mensaje en sesión y redirigimos para que se muestre en la página de inicio con mensajeModal. Este es el mensaje que se muestra en él.
    req.session.mensaje = "Tu contraseña ha sido restablecida a '123456'. Te recomendamos cambiarla en el apartado Mi Cuenta.";
      
    return req.session.save(() => res.redirect("/")); 
  } catch (error) {
    console.error("❌ Error en restablecerPassword:", error);
    req.session.errores = ["Error en el servidor. Inténtalo nuevamente."];
    res.redirect("/");
  }
};

// Exportar funciones
export {
  paginaInicio,
  registrarUsuario,
  verificarCuenta,
  loginUsuario,
  logoutUsuario,
  recordarPassUsuario,
  restablecerPassword,
};
