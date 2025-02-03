import { AuthService } from "../services/auth.service.js";

export const AuthController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const { user, token } = await AuthService.register(name, email, password);

      res.status(201).json({ message: "Usuario registrado", user, token });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message || "Error interno del servidor" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);

      res.status(200).json({ message: "Inicio de sesión exitoso", user, token });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message || "Error interno del servidor" });
    }
  },
};
