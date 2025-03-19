import { Usuario } from "../models/Usuario.js";
import { Perro } from "../models/Perro.js";
import bcrypt from "bcrypt";

const mostrarCuenta = async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect("/");
    }

    try {
        const usuario = await Usuario.findOne({
            where: { id_usuario: req.session.usuario.id },
            attributes: [
                "email", "nombre", "apellidos", "dni", "telefono1",
                "telefono2", "direccion", "ciudad", "provincia", "pais", "cp"
            ]
        });

        if (!usuario) {
            req.session.errores = ["No se pudo cargar la cuenta."];
            return res.redirect("/");
        }

        res.render("miCuenta", {
            pagina: "Mi Cuenta",
            usuario: usuario.toJSON(),
        });
    } catch (error) {
        console.error("❌ Error cargando la cuenta:", error);
        req.session.errores = ["Error en el servidor."];
        res.redirect("/");
    }
};

const actualizarCuenta = async (req, res) => {
    try {
        const { nombre, apellidos, dni, password, password2, telefono1, telefono2, direccion, cp, ciudad, provincia, pais } = req.body;

        if (password && password !== password2) {
            return res.status(400).json({ error: "Las contraseñas no coinciden." });
        }

        let updateData = { nombre, apellidos, dni, telefono1, telefono2, direccion, cp, ciudad, provincia, pais };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await Usuario.update(updateData, { where: { id_usuario: req.session.usuario.id } });

        return res.status(200).json({ mensaje: "Datos actualizados correctamente." });
    } catch (error) {
        console.error("❌ Error al actualizar cuenta:", error);
        return res.status(500).json({ error: "Error en el servidor. Inténtalo nuevamente." });
    }
};

const misPerros = async (req, res) => {
    try {
        if (!req.session.usuario) {
            return res.redirect("/"); // Redirigir si no está autenticado
        }

        const usuarioId = req.session.usuario.id;

        // Obtener los perros del usuario
        const perros = await Perro.findAll({ where: { id_usuario: usuarioId } });

        // Agrupar los perros por raza
        const perrosPorRaza = perros.reduce((acc, perro) => {
            if (!acc[perro.raza]) {
                acc[perro.raza] = [];
            }
            acc[perro.raza].push(perro);
            return acc;
        }, {});

        res.render("misPerros", {
            pagina: "Mis Perros",
            usuario: req.session.usuario,
            perrosPorRaza
        });

    } catch (error) {
        console.error("❌ Error al obtener perros:", error);
        res.status(500).send("Error en el servidor");
    }
};

export { mostrarCuenta, actualizarCuenta, misPerros };
