import jwt from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "tu_secreto_para_jwt";

export const authenticateToken = (req, res, next) => {
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado, token requerido." });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("Error al verificar el token:", err);
      return res.status(403).json({ error: "Token inválido o expirado." });
    }

    req.user = user;
    next();
  });
};
