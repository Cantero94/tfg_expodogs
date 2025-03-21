import { Exposicion } from "../models/Exposicion.js";
import { Perro } from "../models/Perro.js";
import { Inscripcion } from "../models/Inscripcion.js";
import { Usuario } from "../models/Usuario.js";
import nodemailer from "nodemailer";
import { Op } from "sequelize";
import { generarPDFInscripcion } from "../utils/generarPDFInscripcion.js";
import crypto from "crypto";
import fs from "fs/promises";

export const vistaInscribirPerro = async (req, res) => {
  const usuarioId = req.session.usuario?.id;
  if (!usuarioId) return res.redirect("/");

  const hoy = new Date();
  const exposiciones = await Exposicion.findAll({
    where: {
      [Op.or]: [
        { plazo1_inicio: { [Op.lte]: hoy }, plazo1_fin: { [Op.gte]: hoy } },
        { plazo2_inicio: { [Op.lte]: hoy }, plazo2_fin: { [Op.gte]: hoy } },
      ],
    },
    order: [["fecha", "ASC"]],
  });

  res.render("inscribirPerro", {
    pagina: "Inscribir Perro",
    exposiciones,
    usuario: req.session.usuario || null,
  });
};

export const obtenerPerrosParaInscripcion = async (req, res) => {
  const usuarioId = req.session.usuario?.id;
  const { expoId } = req.query;
  if (!usuarioId || !expoId)
    return res.status(400).json({ error: "Faltan datos" });

  const perros = await Perro.findAll({ where: { id_usuario: usuarioId } });
  const inscripciones = await Inscripcion.findAll({
    where: { id_usuario: usuarioId, id_exposicion: expoId },
  });

  const perrosConEstado = perros.map((perro) => {
    const insc = inscripciones.find((i) => i.id_perro === perro.id_perro);
    return {
      ...perro.dataValues,
      inscrito: !!insc,
      clase: insc?.clase || null,
    };
  });

  res.json(perrosConEstado);
};

export const inscribirPerros = async (req, res) => {
    try {
      // 🔹 Primero obtenemos el usuarioId correctamente
      const usuarioId = req.session.usuario?.id;
      if (!usuarioId) return res.status(401).json({ error: "Usuario no autenticado." });
  
      // 🔹 Ahora sí, buscamos al usuario completo
      const usuario = await Usuario.findByPk(usuarioId);
      const { expoId, perros } = req.body;
  
      if (!expoId || !perros?.length) {
        return res.status(400).json({ error: "Datos inválidos." });
      }
  
      const cod_pago = crypto.randomBytes(8).toString("hex");
      const exposicion = await Exposicion.findByPk(expoId);
      const precioBase = exposicion.precio_inscripcion;
      const descuento = [1, 0.75, 0.5];
  
      // 🔸 Contar perros ya inscritos del usuario en esta exposición
      const inscripcionesPrevias = await Inscripcion.count({
        where: { id_usuario: usuarioId, id_exposicion: expoId },
      });
  
      const nuevasInscripciones = [];
  
      for (let i = 0; i < perros.length; i++) {
        const { id_perro, clase } = perros[i];
  
        const indexTotal = inscripcionesPrevias + i;
        const factor = indexTotal === 0 ? 1 : indexTotal === 1 ? 0.75 : 0.5;
        const precio = +(precioBase * factor).toFixed(2);
  
        let tarifa_aplicada = "Tercer perro y siguientes";
        if (indexTotal === 0) tarifa_aplicada = "Primer perro";
        else if (indexTotal === 1) tarifa_aplicada = "Segundo perro";
  
        const inscripcion = await Inscripcion.create({
          id_exposicion: expoId,
          id_perro,
          id_usuario: usuarioId,
          clase,
          cod_pago,
          precio,
          tarifa_aplicada,
          estado: "pendiente",
        });
  
        nuevasInscripciones.push(inscripcion);
      }
  
      // ✅ Enviar correo con la confirmación y el PDF
      await enviarCorreoConfirmacionInscripcion(usuario, exposicion, cod_pago);
  
      return res.status(200).json({ success: true, cod_pago });
    } catch (error) {
      console.error("❌ Error en inscribirPerros:", error);
      res.status(500).json({ error: "Error en el servidor." });
    }
  };
  

const enviarCorreoConfirmacionInscripcion = async (usuario, exposicion, cod_pago) => {
  try {
    const inscripciones = await Inscripcion.findAll({
      where: { cod_pago },
      include: [Perro],
    });

    const perrosDB = inscripciones.map((i) => i.perro);

    const lista = inscripciones.map(i => {
      const p = i.perro;
      return `<li style="text-align: left; margin-bottom: 10px;"><b>${p.nombre}</b><br>
                - Microchip: ${p.microchip}<br>
                - ${p.libro} ${p.numero_libro}<br>
                - Clase: ${i.clase} ${p.sexo}s<br>
                - Tarifa aplicada: ${i.tarifa_aplicada}<br>
                - <b>${i.precio}€</b>
              </li>`;
    }).join("");

    const pdfPath = await generarPDFInscripcion(usuario, exposicion, cod_pago, perrosDB, inscripciones);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "jc.canterito@gmail.com",
      to: usuario.email,
      subject: "Confirmación de inscripción en Expodogs",
      html: `
      <div style="font-family: Arial, sans-serif; width: 70%; margin: 0 auto;">
        <div style="background-color: #212529; padding: 20px; border-radius: 10px; text-align: center;">
          <img src="http://expodogs.es/media/img/logo.png" alt="Expodogs Logo" style="width: 50%;">
        </div>
        <h2 style="text-align: center; color: #333;">Hola, ${usuario.nombre}</h2>
        <div style="padding: 0px 20px; text-align: left;">
          <p>Hemos recibido correctamente tu inscripción en la exposición:</p>
          <h3 style="color: #212529; text-align: center;">${exposicion.nombre}</h3>
          <p style="text-align: center;"><b>Código de pago:</b> ${cod_pago}</p>
          <hr style="margin: 20px 0;">
          <h4 style="color: #212529;">Detalles de tus perros inscritos:</h4>
          <ul style="padding-left: 20px;">${lista}</ul>
          <p style="margin-top: 30px;">Gracias por confiar en <b>Expodogs</b>.</p>
          <p>Nos vemos en la exposición 🐾</p>
        </div>
      </div>
      `,
      attachments: [
        {
          filename: `inscripcion_${cod_pago}.pdf`,
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    await fs.unlink(pdfPath); // Eliminar el PDF después de enviarlo
    console.log("📧 Correo enviado con PDF a:", usuario.email);
  } catch (error) {
    console.error("❌ Error al enviar correo inscripción:", error);
  }
};