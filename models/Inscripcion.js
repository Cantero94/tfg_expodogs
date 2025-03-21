import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { Exposicion } from "./Exposicion.js";
import { Perro } from "./Perro.js";
import { Usuario } from "./Usuario.js";

export const Inscripcion = db.define(
  "inscripcion",
  {
    id_inscripcion: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    clase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cod_pago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "pagado", "cancelado"),
      allowNull: false,
      defaultValue: "pendiente",
    },
  },
  {
    tableName: "inscripciones", timestamps: true
  }
);

// Definir relaciones
Inscripcion.belongsTo(Exposicion, { foreignKey: "id_exposicion", onDelete: "CASCADE", onUpdate: "CASCADE" });
Inscripcion.belongsTo(Perro, { foreignKey: "id_perro", onDelete: "CASCADE", onUpdate: "CASCADE" });
Inscripcion.belongsTo(Usuario, { foreignKey: "id_usuario", onDelete: "CASCADE", onUpdate: "CASCADE" });