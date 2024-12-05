import express from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import UsuarioController from "../controllers/UsuarioController.js";
import usuarioValidation from "../middlewares/validation/usuarioValidation.js";
import { wrapException } from "../utils/wrapException.js";

const router = express.Router();

router
    .post("/auth/register", usuarioValidation.criarUsuarioValidate, wrapException(UsuarioController.CriarUsuario))
    .get("/auth/profile", AuthMiddleware, wrapException(UsuarioController.listarUsuario))
    .get("/auth/profile/:id", AuthMiddleware, wrapException(UsuarioController.listarUsuarioID))
    .patch("/auth/alter/:id", AuthMiddleware, usuarioValidation.alterarUsuarioValidate, wrapException(UsuarioController.alterarUsuario))
    .delete("/auth/delete/:id", AuthMiddleware, wrapException(UsuarioController.deletarUsuario));

export default router;
