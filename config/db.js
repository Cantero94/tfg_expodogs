import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

/* const db = new Sequelize(process.env.BASEDEDATOS, process.env.USUARIO, process.env.PASSWORD, {
    host: process.env.HOST,
    port: '3306',
    dialect: 'mysql', */
    const db = new Sequelize(process.env.CONEXION, {
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
export default db;
