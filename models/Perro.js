// models/Perro.js
import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { Usuario } from "./Usuario.js";

export const Perro = db.define("perro", {
  id_perro: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  fecha_nacimiento: { type: DataTypes.STRING },
  libro: { type: DataTypes.STRING },
  madre: { type: DataTypes.STRING },
  microchip: { type: DataTypes.STRING },
  nombre: { type: DataTypes.STRING },
  numero_libro: { type: DataTypes.STRING },
  padre: { type: DataTypes.STRING },
  raza: { type: DataTypes.STRING },
  sexo: { type: DataTypes.STRING },
}, { tableName: "perros", timestamps: true });


