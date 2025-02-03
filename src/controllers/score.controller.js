import { ScoreService } from "../services/score.service.js";
import { AppError, BadRequestError } from "../errors/AppError.js";

export const ScoreController = {
  async submitScore(req, res) {
    try {
      const tournamentId = Number(req.params.id);
      const { chefId, score } = req.body;

      if (!chefId || isNaN(chefId)) {
        throw new BadRequestError("El ID del chef es requerido y debe ser un número válido.");
      }

      const updatedEntry = await ScoreService.submitScore(tournamentId, Number(chefId), Number(score));
      res.status(200).json({ message: "Puntaje registrado correctamente", data: updatedEntry });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message || "Error interno del servidor" });
    }
  },
};
