import { TournamentChefService } from "../services/tournamentChef.service.js";

export const TournamentChefController = {
  async registerChef(req, res) {
    try {
      const tournamentId = Number(req.params.id);
      const { chefId } = req.body;

      const registration = await TournamentChefService.registerChefToTournament(
        tournamentId,
        Number(chefId)
      );
      res
        .status(201)
        .json({ message: "Chef registrado en el torneo", data: registration });
    } catch (error) {

      console.error("Error interno:", error);
      res.status(error.statusCode || 500).json({ error: error.message || "Error interno del servidor" });
    }
  },
};
