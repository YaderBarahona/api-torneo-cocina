import { z } from "zod";

export const tournamentSchema = z.object({
  name: z.string().min(3, "El nombre del torneo debe tener al menos 3 caracteres."),
  location: z.string().min(3, "La ubicación debe tener al menos 3 caracteres."),
  maxChefs: z.number().int().positive("El número máximo de chefs debe ser mayor a 0."),
});
