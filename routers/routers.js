import express from "express";
import {
    paginaInicio,
    registrarUsuario,
    verificarCuenta,
    loginUsuario,
    logoutUsuario,
} from "../controllers/clienteController.js";

const router = express.Router();

router.get("/", paginaInicio);
router.post("/registrarUsuario", registrarUsuario);
router.post("/loginUsuario", loginUsuario);
router.get("/verificar-cuenta", verificarCuenta);
router.post("/logout", logoutUsuario);


export default router;