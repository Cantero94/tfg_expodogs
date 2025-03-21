import { Op } from "sequelize";
import { Exposicion } from "../models/Exposicion.js";
import moment from "moment";

const vistaExposiciones = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5; 
    const offset = (page - 1) * limit;

    const search = req.query.search ? req.query.search.toLowerCase() : "";
    const organizador = req.query.organizador || "";
    const year = req.query.year || "";

    let whereCondition = {};

    if (search) {
      whereCondition.nombre = { [Op.like]: `%${search}%` };
    }

    if (organizador) {
      whereCondition.entidad_organizadora = organizador;
    }

    if (year) {
      whereCondition.fecha = { [Op.startsWith]: year };
    }

    const { count: totalExposiciones, rows: exposiciones } = await Exposicion.findAndCountAll({
      where: whereCondition,
      order: [["fecha", "DESC"]],
      limit,
      offset,
    });

    // 🔹 Respetar `limit` cuando no hay filtros
    if (!search && !organizador && !year) {
      limit = parseInt(req.query.limit) || 5; // Aplicar el valor de `limit` en la vista
    } else {
      limit = totalExposiciones; // Si hay filtros, mostrar todo
    }

    const totalPages = Math.ceil(totalExposiciones / limit);

    const todasExposiciones = await Exposicion.findAll();
    const entidadesUnicas = [...new Set(todasExposiciones.map((exp) => exp.entidad_organizadora))].sort();

    res.render("exposiciones", {
      pagina: "Exposiciones",
      exposiciones,
      entidadesUnicas,
      totalExposiciones,
      usuario: req.session.usuario || null,
      moment,
      currentPage: page,
      totalPages,
      limit,
    });
  } catch (error) {
    console.error("❌ Error al obtener exposiciones:", error);
    res.status(500).send("Error en el servidor.");
  }
};

export { vistaExposiciones };