import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const Exposicion = db.define(
  "exposicion",
  {
    id_exposicion: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    ambito: { type: DataTypes.STRING },
    cargo_paypal: { type: DataTypes.BOOLEAN },
    cartel: { type: DataTypes.STRING },
    contar_veteranos: { type: DataTypes.BOOLEAN },
    descuento_razas: { type: DataTypes.DOUBLE },
    descuento_socios: { type: DataTypes.DOUBLE },
    entidad_organizadora: { type: DataTypes.STRING },
    fecha: { type: DataTypes.STRING }, // Considera cambiarlo a `DATE`
    lugar: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    nombre_corto: { type: DataTypes.STRING },
    plazo1_fin: { type: DataTypes.STRING },
    plazo1_inicio: { type: DataTypes.STRING },
    plazo2_fin: { type: DataTypes.STRING },
    plazo2_inicio: { type: DataTypes.STRING },
    precio_inscripcion: { type: DataTypes.DOUBLE },
    tipo: { type: DataTypes.STRING },
  },
  { tableName: "exposiciones", timestamps: true }
);
