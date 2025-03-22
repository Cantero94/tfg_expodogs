import { Exposicion } from "../models/Exposicion.js";
import { Perro } from "../models/Perro.js";
import { Inscripcion } from "../models/Inscripcion.js";
import { Usuario } from "../models/Usuario.js";
import { CodPago } from "../models/CodPago.js";
import nodemailer from "nodemailer";
import { Op } from "sequelize";
import { generarPDFInscripcion } from "../utils/generarPDFInscripcion.js";
import crypto from "crypto";
import fs from "fs/promises";

const vistaInscribirPerro = async (req, res) => {
  
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

  const expoSeleccionada = req.params.id || null;

  res.render("inscribirPerro", {
    pagina: "Inscribir Perro",
    exposiciones,
    expoSeleccionada,
    usuario: req.session.usuario || null,
  });
};

const obtenerPerrosParaInscripcion = async (req, res) => {
  const usuarioId = req.session.usuario?.id;
  const { expoId } = req.query;
  if (!usuarioId || !expoId)
    return res.status(400).json({ error: "Faltan datos" });

  const perros = await Perro.findAll({ where: { id_usuario: usuarioId } });
  const inscripciones = await Inscripcion.findAll({
    where: { id_usuario: usuarioId, id_exposicion: expoId },
  });

  const perrosInscritos = perros.map((perro) => {
    const insc = inscripciones.find((i) => i.id_perro === perro.id_perro);
    return {
      ...perro.dataValues,
      inscrito: !!insc,
      clase: insc?.clase || null,
    };
  });

  res.json(perrosInscritos);
};

const inscribirPerros = async (req, res) => {
  try {
    const usuarioId = req.session.usuario?.id;
    if (!usuarioId) return res.redirect("/");

    const usuario = await Usuario.findByPk(usuarioId);
    const { expoId, perros } = req.body;

    if (!expoId || !perros?.length) {
      return res.status(400).json({ error: "Datos inválidos." });
    }

    const exposicion = await Exposicion.findByPk(expoId);
    const precioBase = exposicion.precio_inscripcion;

    // 🔸 Crea registro CodPago
    const cod_pago = crypto.randomBytes(8).toString("hex");
    const nuevoPago = await CodPago.create({
      cod_pago,
      id_usuario: usuarioId,
      id_exposicion: expoId,
      total: 0,
      estado: "pendiente",
      metodo: "desconocido"
    });

    // 🔸 Contar inscripciones previas para calcular descuentos
    const inscripcionesPrevias = await Inscripcion.count({
      where: { id_usuario: usuarioId, id_exposicion: expoId }
    });

    let totalFinal = 0;
    
    const nuevasInscripciones = perros.map(({ id_perro, clase }, i) => {
      const indexTotal = inscripcionesPrevias + i;
      const factor = indexTotal === 0 ? 1 : indexTotal === 1 ? 0.75 : 0.5;
      const precio = +(precioBase * factor).toFixed(2);
      totalFinal += precio;

      let tarifa_aplicada = "Tercer perro y siguientes";
      if (indexTotal === 0) tarifa_aplicada = "Primer perro";
      else if (indexTotal === 1) tarifa_aplicada = "Segundo perro";

      return {
        id_exposicion: expoId,
        id_perro,
        id_usuario: usuarioId,
        clase,
        precio,
        tarifa_aplicada,
        id_pago: nuevoPago.id_pago
      };
    });

    await Inscripcion.bulkCreate(nuevasInscripciones);
    await nuevoPago.update({ total: totalFinal });

    await enviarCorreoConfirmacionInscripcion(usuario, exposicion, cod_pago);

    return res.status(200).json({ cod_pago });

  } catch (error) {
    console.error("❌ Error en inscribirPerros:", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};
  
const enviarCorreoConfirmacionInscripcion = async (usuario, exposicion, cod_pago) => {
  try {
    const pago = await CodPago.findOne({
      where: { cod_pago },
      include: {
        model: Inscripcion,
        as: "inscripciones",
        include: [Perro]
      }
    });

    if (!pago || !pago.inscripciones.length) {
      throw new Error("Código de pago no válido o sin inscripciones.");
    }

    const inscripciones = pago.inscripciones;
    const perrosDB = inscripciones.map(i => i.perro);

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

    const pdfPath = await generarPDFInscripcion(usuario, exposicion, pago, perrosDB, inscripciones);

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
          <img src="http://expodogs.es/media/img/logo.png" alt="Expodogs Logo" style="width: 33%;">
        </div>
        <h2 style="text-align: center; color: #333;">Hola, ${usuario.nombre}</h2>
        <div style="padding: 0px 20px; text-align: left;">
          <p>Hemos recibido correctamente tu inscripción en la exposición:</p>
          <h3 style="color: #212529; text-align: center;">${exposicion.nombre}</h3>
          <p style="text-align: center;"><b>Código de pago:</b> ${cod_pago}</p>
          <p style="text-align: center;"><b>Precio total estimado:</b> ${pago.total.toFixed(2)}€</p>
          <hr style="margin: 20px 0;">
          <h4 style="color: #212529;">Detalles de tus perros inscritos:</h4>
          <ul style="padding-left: 20px;">${lista}</ul>
          <p style="margin-top: 30px; text: center;">Gracias por confiar en <b>Expodogs</b>. Nos vemos en la exposición! 🐾</p>
        </div>
      </div>
      `,
      attachments: [{
        filename: `inscripcion_${cod_pago}.pdf`,
        path: pdfPath,
      }]
    };

    await transporter.sendMail(mailOptions);
    await fs.unlink(pdfPath); // Borra PDF tras enviar
    console.log("📧 Correo enviado con PDF a:", usuario.email);

  } catch (error) {
    console.error("❌ Error al enviar correo inscripción:", error);
  }
};

const misInscripcionesYPagos = async (req, res) => {
  try {
    const usuarioId = req.session.usuario?.id;
    if (!usuarioId) return res.redirect("/");

    const pagos = await CodPago.findAll({
      where: { id_usuario: usuarioId },
      include: [
        {
          model: Inscripcion,
          as: "inscripciones",
          include: [
            {
              model: Perro,
              attributes: ["id_perro", "nombre", "raza", "sexo", "microchip", "libro", "numero_libro"]
            },
            {
              model: Exposicion,
              attributes: ["id_exposicion", "nombre", "fecha"]
            }
          ]
        },
        {
          model: Exposicion,
          attributes: ["id_exposicion", "nombre", "fecha"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });
    
    // console.log("📦 Pagos con inscripciones:", JSON.stringify(pagos, null, 2));
    
    const pagosConAgrupadas = pagos.map((pago) => {
      const agrupadas = {};
    
      (pago.inscripciones || []).forEach((insc) => {
        const raza = insc.perro?.raza || "Sin raza";
        if (!agrupadas[raza]) agrupadas[raza] = [];
        agrupadas[raza].push(insc);
      });
    
      return {
        ...pago.get({ plain: true }),
        agrupadas
      };
    });
    
    res.render("misInscripcionesYPagos", {
      pagina: "Mis Inscripciones y Pagos",
      pagos: pagosConAgrupadas,
      usuario: req.session.usuario
    });

  } catch (error) {
    console.error("❌ Error al obtener inscripciones:", error);
    res.status(500).render("500", { pagina: "Error", error });
  }
};

const generarPDF = async (req, res) => {
  try {
    const { codPago } = req.params;

    const pago = await CodPago.findOne({
      where: { cod_pago: codPago },
      include: [
        {
          model: Inscripcion,
          as: "inscripciones",
          include: [Perro]
        },
        Exposicion,
        Usuario
      ]
    });

    if (!pago) {
      return res.status(404).send("Código de pago no encontrado.");
    }

    const usuario = pago.usuario;
    const exposicion = pago.exposicion;
    const inscripciones = pago.inscripciones || [];
    const perros = inscripciones.map(i => i.perro).filter(Boolean);

    const pdfPath = await generarPDFInscripcion(usuario, exposicion, pago, perros, inscripciones);

    return res.sendFile(pdfPath);
  } catch (err) {
    console.error("❌ Error al generar PDF:", err);
    return res.status(500).send("Error al generar el PDF.");
  }
};

const pagar = async (req, res) => {
  try {
    const { cod_pago } = req.params;
    const usuarioId = req.session.usuario?.id;

    if (!usuarioId) return res.redirect("/");

    const pago = await CodPago.findOne({ where: { cod_pago, id_usuario: usuarioId } });

    if (!pago) {
      return res.status(404).render("404", { pagina: "Pago no encontrado" });
    }

    if (pago.estado === "pagado") {
      return res.redirect("/misInscripcionesYPagos");
    }

    await pago.update({
      estado: "pagado",
      fecha_pago: new Date()
    });

    res.redirect("/misInscripcionesYPagos");
  } catch (error) {
    console.error("❌ Error al marcar pago como pagado:", error);
    res.status(500).render("500", { pagina: "Error", error });
  }
};

export {
  vistaInscribirPerro,
  obtenerPerrosParaInscripcion,
  inscribirPerros,
  misInscripcionesYPagos,
  generarPDF,
  pagar
}
