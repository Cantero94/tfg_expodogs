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

const router = express.Router();

router.get("/", paginaInicio);
router.post("/registrarUsuario", registrarUsuario);
router.get("/verificar-cuenta", verificarCuenta);
router.post("/loginUsuario", loginUsuario);
router.post("/logout", logoutUsuario);
router.post("/recordarPassUsuario", recordarPassUsuario);
router.get("/restablecer-password", restablecerPassword);



export default router;