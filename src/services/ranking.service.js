import { AppDataSource } from "../config/database.js";
import Tournament from "../database/entities/tournament.entity.js";
import TournamentChef from "../database/entities/tournamentChef.entity.js";
import { NotFoundError } from "../errors/AppError.js";

const tournamentRepository = AppDataSource.getRepository(Tournament);
const tournamentChefRepository = AppDataSource.getRepository(TournamentChef);

export const RankingService = {
  async getTournamentRanking(tournamentId) {
    const tournament = await tournamentRepository.findOne({
      where: { id: tournamentId },
      relations: ["tournamentCategories", "tournamentCategories.category"],
    });

    if (!tournament) throw new NotFoundError("Torneo no encontrado");

    const ranking = await tournamentChefRepository
      .createQueryBuilder("tournamentChef")
      .innerJoinAndSelect("tournamentChef.chef", "chef")
      .where("tournamentChef.tournamentId = :tournamentId", { tournamentId })
      .orderBy("tournamentChef.score", "DESC")
      .select(["chef.name AS chef", "tournamentChef.score"])
      .getRawMany();

    return {
      tournament: tournament.name,
      location: tournament.location,
      categories: tournament.tournamentCategories.map((tc) => tc.category.name),
      ranking,
    };
  },
};
