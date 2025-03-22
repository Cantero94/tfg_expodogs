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
    misPerros
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

const router = express.Router();

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


router.get("/exposiciones", vistaExposiciones);


router.get("/inscribirPerro", vistaInscribirPerro);
router.get("/inscribirPerro/:id", vistaInscribirPerro);
router.get("/obtenerPerrosParaInscripcion", obtenerPerrosParaInscripcion);
router.post("/inscribirPerros", inscribirPerros);

router.get("/misInscripcionesYPagos", misInscripcionesYPagos);
router.get("/generarPDF/:codPago", generarPDF);
router.post("/pagar/:cod_pago", pagar);
export default router;