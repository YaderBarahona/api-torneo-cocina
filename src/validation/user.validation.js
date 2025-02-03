import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({ required_error: "El nombre de usuario es obligatorio" }),
  email: z
    .string({ required_error: "El correo es obligatorio" })
    .email("El correo electrónico no es válido"),

  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña no debe exceder los 100 caracteres"),
});

export const loginSchema = z.object({
  email: z.string({
    required_error: "El correo es obligatorio.",
  }),
  password: z.string({ required_error: "La contraseña es obligatoria." }),
});
