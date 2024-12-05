import express from "express";
import AuthController from "../controllers/AuthController.js";
import AuthValidate from "../middlewares/validation/authValidation.js";
import { wrapException } from "../utils/wrapException.js";

const router = express.Router();

router
    .post("/auth/login", AuthValidate.loginValidate, wrapException(AuthController.logar));

export default router;
