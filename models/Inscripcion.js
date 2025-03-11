import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { Exposicion } from "./Exposicion.js";
import { Perro } from "./Perro.js";
import { Usuario } from "./Usuario.js";

export const Inscripcion = db.define("inscripcion", {
  id_inscripcion: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  clase: { type: DataTypes.STRING },
  cod_pago: { type: DataTypes.STRING, allowNull: false },
  fecha_inscripcion: { type: DataTypes.STRING },
  precio: { type: DataTypes.DOUBLE },
  estado: { type: DataTypes.STRING },
}, { tableName: "inscripciones", timestamps: false });

Inscripcion.belongsTo(Exposicion, { foreignKey: "id_exposicion" });
Inscripcion.belongsTo(Perro, { foreignKey: "id_perro" });
Inscripcion.belongsTo(Usuario, { foreignKey: "id_usuario" });
