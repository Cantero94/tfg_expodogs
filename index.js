import express from 'express';
import router from './routers/routers.js';
import db from './config/db.js';
import session from "express-session";
import "./models/relaciones.js";


const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || "expodogs-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

db.authenticate()
    .then(()=> console.log(`🧮  Conectado a la base de datos`))
    .catch(err => console.log(err));

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
app.listen(port, () => {console.log(`🚀 Servidor corriendo en: http://localhost:${port}`)});
