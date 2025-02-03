import { z } from "zod";

export const tournamentChefSchema = z.object({
  chefId: z.number().int().positive("ID del chef inválido."),
});
