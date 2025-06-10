import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST || 'canterodev.es',
    port: process.env.DB_PORT,
    dialect: 'mysql',
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

/* db.sync({ force: false }) // 👁️👁️ ojo con poner force: true porque borra la base de datos...
  .then(() => console.log("✔️ Base de datos sincronizada correctamente"))
  .catch((err) => console.error("❌ Error al sincronizar la base de datos:", err));
 */
export default db;
