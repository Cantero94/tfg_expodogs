import { Exposicion } from "../models/Exposicion.js";
import { Perro } from "../models/Perro.js";
import { Inscripcion } from "../models/Inscripcion.js";
import { Op } from "sequelize";
import crypto from "crypto";

export const vistaInscribirPerro = async (req, res) => {
  const usuarioId = req.session.usuario?.id;
  if (!usuarioId) return res.redirect("/");

  const hoy = new Date();
  const exposiciones = await Exposicion.findAll({
    where: {
      [Op.or]: [
        { plazo1_inicio: { [Op.lte]: hoy }, plazo1_fin: { [Op.gte]: hoy } },
        { plazo2_inicio: { [Op.lte]: hoy }, plazo2_fin: { [Op.gte]: hoy } }
      ]
    },
    order: [["fecha", "ASC"]],
  });

  res.render("inscribirPerro", {
    pagina: "Inscribir Perro",
    exposiciones,
    usuario: req.session.usuario || null
  });
};

export const obtenerPerrosParaInscripcion = async (req, res) => {
  const usuarioId = req.session.usuario?.id;
  const { expoId } = req.query;
  if (!usuarioId || !expoId) return res.status(400).json({ error: "Faltan datos" });

  const perros = await Perro.findAll({ where: { id_usuario: usuarioId } });
  const inscripciones = await Inscripcion.findAll({
    where: { id_usuario: usuarioId, id_exposicion: expoId }
  });

  const perrosConEstado = perros.map(perro => {
    const insc = inscripciones.find(i => i.id_perro === perro.id_perro);
    return {
      ...perro.dataValues,
      inscrito: !!insc,
      clase: insc?.clase || null
    };
  });

  res.json(perrosConEstado);
};

export const inscribirPerros = async (req, res) => {
    try {
      const usuarioId = req.session.usuario?.id;
      const { expoId, perros } = req.body;
  
      if (!usuarioId || !expoId || !perros?.length) {
        return res.status(400).json({ error: "Datos inválidos." });
      }
  
      const cod_pago = crypto.randomBytes(8).toString("hex");
      const exposicion = await Exposicion.findByPk(expoId);
      const precioBase = exposicion.precio_inscripcion;
      const descuento = [1, 0.75, 0.5]; // 1° perro = 100%, 2° = 75%, 3°+ = 50%
  
      // 🔸 Contar perros ya inscritos del usuario en esta exposición
      const inscripcionesPrevias = await Inscripcion.count({
        where: {
          id_usuario: usuarioId,
          id_exposicion: expoId
        }
      });
  
      // 🔸 Añadir los nuevos
      for (let i = 0; i < perros.length; i++) {
        const { id_perro, clase } = perros[i];
  
        const indexTotal = inscripcionesPrevias + i;
        const factor = indexTotal === 0 ? 1 : indexTotal === 1 ? 0.75 : 0.5;
        const precio = +(precioBase * factor).toFixed(2); // Redondear
  
        await Inscripcion.create({
          id_exposicion: expoId,
          id_perro,
          id_usuario: usuarioId,
          clase,
          cod_pago,
          precio,
          estado: "pendiente"
        });
      }
  
      return res.status(200).json({ success: true, cod_pago });
    } catch (error) {
      console.error("❌ Error en inscribirPerros:", error);
      res.status(500).json({ error: "Error en el servidor." });
    }
  };
/*   
export const inscribirPerros = async (req, res) => {
  const usuarioId = req.session.usuario?.id;
  const { expoId, perros } = req.body;
  if (!usuarioId || !expoId || !perros?.length) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  const exposicion = await Exposicion.findByPk(expoId);
  const cod_pago = crypto.randomBytes(8).toString("hex");
  const base = exposicion.precio_inscripcion;
  const porcentajes = [1, 0.75, 0.5];

  for (let i = 0; i < perros.length; i++) {
    const { id_perro, clase } = perros[i];
    await Inscripcion.create({
      id_usuario: usuarioId,
      id_perro,
      id_exposicion: expoId,
      clase,
      cod_pago,
      precio: base * (porcentajes[i] ?? 0.5),
      estado: "pendiente"
    });
  }

  req.session.mensaje = `Inscripciones generadas con éxito. Código de pago: ${cod_pago}`;
  req.session.save(() => res.redirect("/inscribirPerro"));
}; */
