import { TournamentService } from "../services/tournament.service.js";
import { AppError } from "../errors/AppError.js";

export const TournamentController = {
  async createTournament(req, res) {
    try {
      const tournament = await TournamentService.createTournament(req.body);
      res.status(201).json(tournament);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  async getAllTournaments(req, res) {
    try {
      const tournaments = await TournamentService.getAllTournaments();
      const formattedTournaments = tournaments.map((tournament) => ({
        id: tournament.id,
        name: tournament.name,
        location: tournament.location,
        maxChefs: tournament.maxChefs,
        categories: tournament.tournamentCategories.map((tc) => tc.category.name),
      }));

      res.json({ data: formattedTournaments });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  async getTournamentById(req, res) {
    try {
      const tournament = await TournamentService.getTournamentById(req.params.id);
      const formattedTournament = {
        id: tournament.id,
        name: tournament.name,
        location: tournament.location,
        maxChefs: tournament.maxChefs,
        categories: tournament.tournamentCategories.map((tc) => tc.category.name),
      };

      res.json(formattedTournament);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  async registerChef(req, res) {
    try {
      const tournamentId = Number(req.params.id);
      const { chefId } = req.body;

      if (!chefId) throw new BadRequestError("El ID del chef es requerido");

      const registration = await TournamentChefService.registerChefToTournament(tournamentId, chefId);
      res.status(201).json({ message: "Chef registrado en el torneo", data: registration });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  async assignCategories(req, res) {
    try {
      const { categoryIds } = req.body;
      const tournamentId = Number(req.params.id);

      if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
        throw new BadRequestError("Se debe proporcionar al menos una categoría");
      }

      const updatedTournament = await TournamentService.assignCategoriesToTournament(tournamentId, categoryIds);
      res.status(200).json({
        message: "Categorías asignadas correctamente",
        data: updatedTournament,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },
};
