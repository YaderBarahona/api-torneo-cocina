import { AppDataSource } from "../config/database.js";
import User from "../database/entities/user.entity.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import { ConflictError, UnauthorizedError, BadRequestError } from "../errors/AppError.js";

const userRepository = AppDataSource.getRepository(User);

export const AuthService = {
  async register(name, email, password) {
    if (!name || !email || !password) {
      throw new BadRequestError("Todos los campos son obligatorios");
    }

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) throw new ConflictError("El email ya está registrado");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ name, email, password: hashedPassword });

    await userRepository.save(user);

    const token = await createAccessToken({ id: user.id, email: user.email });

    return { user, token };
  },

  async login(email, password) {
    if (!email || !password) {
      throw new BadRequestError("El email y la contraseña son obligatorios");
    }

    const user = await userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedError("Credenciales incorrectas");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedError("Credenciales incorrectas");

    const token = await createAccessToken({ id: user.id, email: user.email });

    return { user, token };
  },
};
