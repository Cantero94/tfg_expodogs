import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const Usuario = db.define("usuario", {
  id_usuario: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  activo: { type: DataTypes.BOOLEAN, defaultValue: false },
  apellidos: { type: DataTypes.STRING },
  baneado: { type: DataTypes.BOOLEAN },
  ciudad: { type: DataTypes.STRING },
  cp: { type: DataTypes.STRING },
  direccion: { type: DataTypes.STRING },
  dni: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  nombre: { type: DataTypes.STRING },
  pais: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  provincia: { type: DataTypes.STRING },
  telefono1: { type: DataTypes.STRING },
  telefono2: { type: DataTypes.STRING },
  token_verificacion: { type: DataTypes.STRING },
}, { tableName: "usuarios", timestamps: true });
