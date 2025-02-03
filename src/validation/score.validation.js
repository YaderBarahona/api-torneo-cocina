import { z } from "zod";

export const scoreSchema = z.object({
  chefId: z.number().int().positive("ID del chef inválido."),
  score: z.number().min(0, "El puntaje debe estar entre 0 y 100.").max(100, "El puntaje debe estar entre 0 y 100."),
});
