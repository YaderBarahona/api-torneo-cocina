import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { registerSchema, loginSchema } from "../validation/user.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);

export default router;
