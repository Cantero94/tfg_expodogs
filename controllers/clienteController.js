import { Exposicion } from "../models/Exposicion.js";
import { Usuario } from "../models/Usuario.js";
import { Perro } from "../models/Perro.js";
import { Inscripcion } from "../models/Inscripcion.js";
import bcrypt from "bcrypt";
import moment from "moment";
import nodemailer from "nodemailer";
import crypto from "crypto";
import e from "express";

// Página de inicio
const paginaInicio = async (req, res) => {
    try {
        const exposiciones = await Exposicion.findAll({ order: [["fecha", "DESC"]] });

        res.render("paginainicio", {
            pagina: "Inicio",
            exposiciones,
            usuario: req.session.usuario || null,
            moment
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en la base de datos");
    }
};

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, apellidos, dni, email, password, telefono1, telefono2, direccion, cp, ciudad, provincia, pais } = req.body;

        // Expresión regular para teléfonos internacionales
        const telefonoRegex = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}$/;

        if (!telefonoRegex.test(telefono1)) {
            return res.status(400).json({ error: "❌ El número de Teléfono 1 no es válido." });
        }
        if (telefono2 && !telefonoRegex.test(telefono2)) {
            return res.status(400).json({ error: "❌ El número de Teléfono 2 no es válido." });
        }

        // Validar DNI/NIE/Pasaporte en el backend
        if (!validarIdentificacion(dni)) {
            return res.status(400).json({ error: "❌ El DNI/NIE/Pasaporte no es válido." });
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            console.log("❌ Error: El correo ya está registrado.");
            return res.status(400).json({ error: "El correo ya está registrado." });
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
        return res.status(500).json({ error: "Error en el servidor. Inténtalo nuevamente." }); // ✅ Ahora devuelve JSON en caso de error
    }
};

const validarDNI = (dni) => {
    const dniRegex = /^\d{8}[A-Z]$/;
    const nieRegex = /^[XYZ]\d{7}[A-Z]$/;

    if (!dniRegex.test(dni) && !nieRegex.test(dni)) return false;

    let numero = dni.slice(0, -1).replace("X", "0").replace("Y", "1").replace("Z", "2");
    let letra = dni.slice(-1);

    const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
    return letrasValidas[numero % 23] === letra;
};

const validarIdentificacion = (identificacion) => {
    const regexExtranjeros = /^[A-Z0-9]{6,20}$/i;

    return validarDNI(identificacion) || regexExtranjeros.test(identificacion);
};

const enviarCorreoConfirmacion = async (email, nombre, tokenVerificacion) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jc.canterito@gmail.com",
                pass: "nvcf imwa wwlp wkgd"
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
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Correo de confirmación enviado a:", email);
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
            return res.status(400).send("Token inválido o cuenta ya activada.");
        }

        // Activar la cuenta y eliminar el token
        await Usuario.update(
            { activo: true, token_verificacion: null },
            { where: { id_usuario: usuario.id_usuario } }
        );

        res.send("Cuenta activada con éxito. Ahora puedes iniciar sesión.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor.");
    }
};

const loginUsuario = async (req, res) => {
    try {
        console.log("📩 Datos recibidos en /loginUsuario:", req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Correo y contraseña son obligatorios" });
        }

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ error: "El correo no está registrado" });
        }

        if (!usuario.activo) {
            return res.status(401).json({ error: "Tu cuenta aún no está activada. Revisa tu correo y sigue el enlace de verificación." });
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        console.log("✅ Usuario autenticado:", usuario.email);

        // Guardar usuario en la sesión
        req.session.usuario = {
            id: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email,
        };

        console.log("📌 Sesión guardada:", req.session.usuario);

        // Redirigir al usuario a la página de inicio
        res.redirect("/");
    } catch (error) {
        console.error("❌ Error en loginUsuario:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

const logoutUsuario = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        res.redirect("/");
    });
};

// Exportar funciones
export {
    paginaInicio,
    registrarUsuario,
    verificarCuenta,
    loginUsuario,
    logoutUsuario,
};