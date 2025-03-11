import { Exposicion } from "../models/Exposicion.js";
import { Usuario } from "../models/Usuario.js";
import { Perro } from "../models/Perro.js";
import { Inscripcion } from "../models/Inscripcion.js";

import bcrypt from "bcrypt";
import moment from "moment";
import nodemailer from "nodemailer";
import crypto from "crypto";
import e from "express";
import dotenv from "dotenv";
dotenv.config();

// Página de inicio
const paginaInicio = async (req, res) => {
    try {
        const exposiciones = await Exposicion.findAll({ order: [["fecha", "DESC"]] });

        const errores = req.session.errores || [];
        req.session.errores = [];

        res.render("paginainicio", {
            pagina: "Inicio",
            exposiciones,
            usuario: req.session.usuario || null,
            errores,
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

        // 🔹 Validar todos los datos antes de procesar
        const errorValidacion = validarDatosRegistro({ nombre, apellidos, dni, email, password, password2, telefono1, telefono2, direccion, cp, ciudad, provincia, pais });

        if (errorValidacion) {
            return res.status(400).json({ error: errorValidacion });
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            console.log("BCK: Error: El correo ya está registrado.");
            return res.status(400).json({ error: "BCK: El correo ya está registrado." });
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

        console.log("BCK Usuario registrado correctamente.");
        res.status(200).json({ mensaje: "Registro exitoso. Revisa tu correo para activarlo." });

    } catch (error) {
        console.error("BCK: Error en registrarUsuario:", error);
        return res.status(500).json({ error: "BCK: Error en el servidor. Inténtalo nuevamente." }); // BCK Ahora devuelve JSON en caso de error
    }
};

// 🔹 Función para validar todos los datos
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

    return null; // ✅ Si todo está bien, no hay errores
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
        };

        await transporter.sendMail(mailOptions);
        console.log("BCK Correo de confirmación enviado a:", email);
    } catch (error) {
        console.error("BCK: Error enviando el correo:", error);
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
        // Redirigir a la página de inicio con la sesión activa
        return res.redirect("/");
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

        console.log("BCK Usuario autenticado:", usuario.email);

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
        console.error("BCK: Error en loginUsuario:", error);
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