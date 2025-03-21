import express from 'express';
import router from './routers/routers.js';
import db from './config/db.js';
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";

const app = express();

// 🟢 Configurar almacenamiento de sesiones en la base de datos
const SessionStore = SequelizeStore(session.Store);
const sessionStore = new SessionStore({ db });

app.use(
    session({
        secret: process.env.SESSION_SECRET || "expodogs-secret",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true }, // Cambia a true si usas HTTPS
    })
);

sessionStore.sync(); // Crear la tabla de sesiones en la base de datos

// Conectar a la base de datos
db.authenticate()
    .then(() => console.log("✅ Conectado a la base de datos"))
    .catch((err) => console.error("❌ Error al conectar a la BD:", err));

app.set('view engine', 'pug');

app.use((req, res, next) => {
    const year = new Date().getFullYear();
    res.locals.year = year;
    res.locals.tituloWeb = 'Expodogs';
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', router);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en: http://localhost:${port}`);
});