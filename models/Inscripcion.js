import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { Exposicion } from "./Exposicion.js";
import { Perro } from "./Perro.js";
import { Usuario } from "./Usuario.js";
import { CodPago } from "./CodPago.js";

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
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tarifa_aplicada: {
      type: DataTypes.STRING 
    },
  },
  {
    tableName: "inscripciones", timestamps: true
  }
);

