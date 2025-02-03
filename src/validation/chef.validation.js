import { z } from "zod";

export const chefSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  specialty: z.string().min(3, "La especialidad debe tener al menos 3 caracteres."),
  experienceYears: z.number().int().min(0, "La experiencia no puede ser negativa."),
});
