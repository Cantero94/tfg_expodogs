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
        const hoy = moment().format("YYYY-MM-DD");
        const exposiciones = await Exposicion.findAll({
            where: {
                fecha: { [Op.gt]: hoy } // Operador de Sequelize mayor que, gt=GreateThan
            },
            order: [["fecha", "ASC"]]
        });

        const errores = req.session.errores || [];
        const erroresLogin = req.session.erroresLogin || [];
        const usuarioIntento = req.session.usuarioIntento || "";
        const mensaje = req.session.mensaje || "";

        req.session.errores = [];
        req.session.erroresLogin = [];
        req.session.usuarioIntento = "";
        req.session.mensaje = "";

        res.render("paginaInicio", {
            pagina: "Inicio",
            exposiciones,
            usuario: req.session.usuario || null,
            mensaje,
            errores,
            erroresLogin,
            usuarioIntento,
            moment
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en la base de datos");
    }
};


const registrarUsuario = async (req, res) => {
    try {
        const { nombre, apellidos, dni, email, password, password2, telefono1, telefono2, direccion, cp, ciudad, provincia, pais } = req.body;

        // Validar todos los datos antes de procesar
        const errorValidacion = validarDatosRegistro({ nombre, apellidos, dni, email, password, password2, telefono1, telefono2, direccion, cp, ciudad, provincia, pais });

        if (errorValidacion) {
            return res.status(400).json({ error: errorValidacion });
        }

        // Verificar si el usuario ya existe, despues de validar los datos
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            console.log("❌ Error: El correo ya está registrado.");
            return res.status(400).json({ error: "BCK: El correo ya está registrado. Si no recuerda su contraseña puede recuperarla haciendo click en '¿Olvidaste tu contraseña?'" });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generar un token de verificación único
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

        // Enviar correo de confirmación
        await enviarCorreoConfirmacion(email, nombre, tokenVerificacion);

        console.log("✅ Usuario registrado correctamente.");
        res.status(200).json({ mensaje: "Registro exitoso. Revisa tu correo para activarlo." });

    } catch (error) {
        console.error("❌ Error en registrarUsuario:", error);
        return res.status(500).json({ error: "BCK: Error en el servidor. Inténtalo nuevamente." });
    }
};

// Función para validar todos los datos
const validarDatosRegistro = (datos) => {
    const { nombre, apellidos, dni, email, password, password2, telefono1, telefono2, direccion, cp, ciudad, provincia, pais } = datos;

    // 🔹 Validar campos obligatorios
    const camposObligatorios = { nombre, apellidos, dni, email, password, password2, telefono1, direccion, cp, ciudad, provincia, pais };

    for (const [campo, valor] of Object.entries(camposObligatorios)) {
        if (!valor || valor.trim() === "") {
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
    const telefonoRegex = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}$/;

    if (!telefonoRegex.test(telefono1)) {
        return "BCK: El número de Teléfono 1 no es válido.";
    }
    if (telefono2 && !telefonoRegex.test(telefono2)) {
        return "BCK: El número de Teléfono 2 no es válido.";
    }

    // 🔹 Validar DNI/NIE/Pasaporte
    const dniRegex = /^\d{8}[A-Z]$/;  // DNI Español
    const nieRegex = /^[XYZ]\d{7}[A-Z]$/; // NIE Español
    const extranjeroRegex = /^[A-Z0-9]{6,20}$/i;  // Pasaporte o ID extranjero

    if (dniRegex.test(dni)) {
        // Si es un DNI, validar la letra
        const numero = dni.slice(0, -1);
        const letraUsuario = dni.slice(-1);
        const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
        const letraCalculada = letrasValidas[numero % 23];

        if (letraUsuario !== letraCalculada) {
            return "BCK: La letra del DNI no es válida.";
        }
    } else if (nieRegex.test(dni)) {
        // Si es un NIE, convertir la letra inicial y validar
        let numero = dni.slice(1, -1);
        let letraUsuario = dni.slice(-1);
        const letraInicial = dni[0];

        if (letraInicial === "X") numero = "0" + numero;
        if (letraInicial === "Y") numero = "1" + numero;
        if (letraInicial === "Z") numero = "2" + numero;

        const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
        const letraCalculada = letrasValidas[parseInt(numero) % 23];

        if (letraUsuario !== letraCalculada) {
            return "BCK: La letra del NIE no es válida.";
        }
    } else if (!extranjeroRegex.test(dni)) {
        // Si no es ni DNI, ni NIE, ni pasaporte válido, mostrar error
        return "BCK: El DNI/NIE/Pasaporte no es válido.";
    }

    return null; // Si todo está bien, no hay errores
};

const enviarCorreoConfirmacion = async (email, nombre, tokenVerificacion) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
        });

        const mailOptions = {
            from: "jc.canterito@gmail.com",
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
            <a href="http://localhost:4000/verificar-cuenta?token=${tokenVerificacion}"
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

const verificarCuenta = async (req, res) => {
    try {
        const { token } = req.query;

        // Buscar al usuario con el token
        const usuario = await Usuario.findOne({ where: { token_verificacion: token } });

        if (!usuario) {
            req.session.errores = ["Enlace inválido o cuenta ya activada."];
            console.log("✅ Error guardado en sesión:", req.session.errores);

            // Guardar sesión antes de redirigir
            req.session.save(() => {
                return res.redirect("/");
            });
            return;
        }

        // Activar la cuenta y eliminar el token
        await Usuario.update(
            { activo: true, token_verificacion: null },
            { where: { id_usuario: usuario.id_usuario } }
        );
        // Iniciar sesión automáticamente
        req.session.usuario = {
            id: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email,
        };

        req.session.mensaje = "Su cuenta ha sido activada correctamente. ¡Bienvenido!";
        // Redirigir a la página de inicio con la sesión activa
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor.");
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        let errores = [];

        if (!email || !password) {
            errores.push("Correo y contraseña son obligatorios.");
        } else {
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                errores.push("El correo no está registrado.");
            } else if (!usuario.activo) {
                errores.push("Tu cuenta aún no está activada. Revisa tu correo.");
            } else if (usuario.baneado) {
                errores.push("Tu cuenta ha sido bloqueada.");
            } else {
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
                }
            }
        }

        if (errores.length > 0) {
            return res.status(400).json({ errores });
        }

        console.log("📌 Sesión guardada:", req.session.usuario);
        return res.status(200).json({ mensaje: "Inicio de sesión exitoso" });

    } catch (error) {
        console.error("❌ Error en loginUsuario:", error);
        return res.status(500).json({ errores: ["Error en el servidor. Inténtalo nuevamente."] });
    }
};


const logoutUsuario = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("❌ Error al cerrar sesión:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        res.redirect("/");
    });
};

const recordarPassUsuario = async (req, res) => {
    try {
        const { email } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(400).json({ error: "Este correo no está registrado." });
        }

        // Generar un nuevo token de verificación
        const tokenVerificacion = crypto.randomBytes(32).toString("hex");
        await Usuario.update(
            { token_verificacion: tokenVerificacion },
            { where: { email } }
        );

        // Enviar correo con enlace para restablecer la contraseña
        await enviarCorreoRestablecer(email, usuario.nombre, tokenVerificacion);

        console.log(`📧 Enlace de recuperación enviado a: ${email}`);
        return res.status(200).json({ mensaje: "Revisa tu correo para restablecer tu contraseña." });

    } catch (error) {
        console.error("❌ Error en recordarPassUsuario:", error);
        return res.status(500).json({ error: "Error en el servidor. Inténtalo nuevamente." });
    }
};



const enviarCorreoRestablecer = async (email, nombre, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
        });

        const mailOptions = {
            from: "jc.canterito@gmail.com",
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
            <a href="http://localhost:4000/restablecer-password?token=${token}"
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


const restablecerPassword = async (req, res) => {
    try {
        const { token } = req.query;

        const usuario = await Usuario.findOne({ where: { token_verificacion: token } });

        if (!usuario) {
            req.session.errores = ["Enlace inválido o ya utilizado."];
            console.log("❌ Intento de uso de token inválido");
            return req.session.save(() => res.redirect("/"));
        }

        // Restablecer la contraseña a 123456 y activar la cuenta si no estaba activada
        const hashedPassword = await bcrypt.hash("asdfgh", 10);
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
    restablecerPassword
};