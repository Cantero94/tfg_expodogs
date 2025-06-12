// models/CodPago.js
import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { Inscripcion } from "./Inscripcion.js";
import { Usuario } from "./Usuario.js";


export const CodPago = db.define("cod_pago", {
  id_pago: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  cod_pago: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "pagado", "fallido"),
    defaultValue: "pendiente",
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fecha_pago: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: "cod_pagos",
  timestamps: true
});