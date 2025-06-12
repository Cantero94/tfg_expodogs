import { Op } from "sequelize";
import { Exposicion } from "../models/Exposicion.js";
import moment from "moment";

const vistaExposiciones = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Obtenemos el valor de la página actual (PA), sino recibimos ninguno será la primera
    let limit = parseInt(req.query.limit) || 5; // Obtenemos el valor del tamaño de página de `limit` (TP) en la URL, sino recibimos ninguno será 5
    const offset = (page - 1) * limit; // Calculamos el registro de inicio (RI) para la consulta

    const nameSearch = req.query.search ? req.query.search.toLowerCase() : "";
    const organizerFilter = req.query.organizador || "";
    const year = req.query.year || "";

    let whereCondition = {};


    if (nameSearch) {
      whereCondition.nombre = { [Op.like]: `%${nameSearch}%` };
    }

    if (organizerFilter) {
      whereCondition.entidad_organizadora = organizerFilter;
    }

    if (year) {
      whereCondition.fecha = { [Op.startsWith]: year };
    }

    // 🔹 Obtenemos el número total de registros en la tabla exposiciones según la condición, sino hay ninguna todas.
    const { count: totalExposiciones, rows: exposiciones } = await Exposicion.findAndCountAll({
      where: whereCondition,
      order: [["fecha", "DESC"]],
      limit,
      offset,
    });

    // 🔹 Para mayor legibilidad, si hay filtros, quitamos el número tamaño de página para mostrar todos los resultados en una sola, sino delvolvemos al valor preestablecido.
    if (!nameSearch && !organizerFilter && !year) {
      limit = parseInt(req.query.limit) || 5;
    } else {
      limit = totalExposiciones;
    }

    // 🔹 Calculamos el número total de páginas
    const totalPages = Math.ceil(totalExposiciones / limit);
    
    const todasExposiciones = await Exposicion.findAll();

    // 🔹 Obtenemos las entidades organizadoras únicas para el select del filtro
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