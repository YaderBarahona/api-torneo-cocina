import { AppDataSource } from "../config/database.js";
import TournamentChef from "../database/entities/tournamentChef.entity.js";
import { NotFoundError, BadRequestError } from "../errors/AppError.js";

const tournamentChefRepository = AppDataSource.getRepository(TournamentChef);

export const ScoreService = {
  async submitScore(tournamentId, chefId, score) {
    const tournamentChef = await tournamentChefRepository.findOne({
      where: { tournament: { id: tournamentId }, chef: { id: chefId } },
    });

    if (!tournamentChef) throw new NotFoundError("El chef no está registrado en este torneo");

    if (isNaN(score) || score < 0 || score > 100) {
      throw new BadRequestError("El puntaje debe estar entre 0 y 100.");
    }

    tournamentChef.score = score;
    await tournamentChefRepository.save(tournamentChef);

    return tournamentChef;
  },
};
