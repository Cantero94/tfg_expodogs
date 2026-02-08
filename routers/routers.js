import express from "express";
import {
    paginaInicio,
    registrarUsuario,
    verificarCuenta,
    loginUsuario,
    logoutUsuario,
    recordarPassUsuario,
    restablecerPassword
} from "../controllers/authController.js";

import {
    mostrarCuenta,
    actualizarCuenta,
    misPerros,
    vistaCrearPerro,
    crearPerro,
    mostrarPerro,
    editarPerro
} from "../controllers/userController.js";

import {
    vistaInscribirPerro,
    obtenerPerrosParaInscripcion,
    inscribirPerros,
    misInscripcionesYPagos,
    generarPDF,
    pagar
} from "../controllers/inscripcionController.js";

import {
    vistaExposiciones,
} from "../controllers/expoController.js";

import {
    panelControl
} from "../controllers/adminController.js";

import { restringirIP } from '../middleware/security.js';



const router = express.Router();

// Esto protegerá TODAS las rutas que definas debajo
router.use('/admin', restringirIP);
// router.get('/admin/login', ...); // Solo accesible desde Tailscale
router.get("/admin", panelControl);

router.get("/", paginaInicio);
router.post("/registrarUsuario", registrarUsuario);
router.get("/verificar-cuenta", verificarCuenta);
router.post("/loginUsuario", loginUsuario);
router.post("/logout", logoutUsuario);
router.post("/recordarPassUsuario", recordarPassUsuario);
router.get("/restablecer-password", restablecerPassword);


router.get("/miCuenta", mostrarCuenta);
router.post("/actualizarCuenta", actualizarCuenta);
router.get("/misPerros", misPerros);
router.get("/crearPerro", vistaCrearPerro);
router.post("/crearPerro", crearPerro);
router.get("/editarPerro/:id", mostrarPerro);
router.post("/editarPerro/:id", editarPerro);


router.get("/exposiciones", vistaExposiciones);


router.get("/inscribirPerro", vistaInscribirPerro);
router.get("/inscribirPerro/:id", vistaInscribirPerro);
router.get("/obtenerPerrosParaInscripcion", obtenerPerrosParaInscripcion);
router.post("/inscribirPerros", inscribirPerros);

router.get("/misInscripcionesYPagos", misInscripcionesYPagos);
router.get("/generarPDF/:codPago", generarPDF);
router.post("/pagar/:cod_pago", pagar);
export default router;