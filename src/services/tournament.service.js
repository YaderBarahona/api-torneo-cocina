import { AppDataSource } from "../config/database.js";
import Tournament from "../database/entities/tournament.entity.js";
import Category from "../database/entities/category.entity.js";
import { NotFoundError, BadRequestError } from "../errors/AppError.js";

const tournamentRepository = AppDataSource.getRepository(Tournament);
const categoryRepository = AppDataSource.getRepository(Category);

export const TournamentService = {
  async createTournament(data) {
    try {
      const tournament = tournamentRepository.create(data);
      await tournamentRepository.save(tournament);
      return tournament;
    } catch (error) {
      throw new BadRequestError("Error al crear el torneo");
    }
  },

  async getAllTournaments() {
    try {
      return await tournamentRepository.find({
        relations: ["tournamentCategories", "tournamentCategories.category"],
      });
    } catch (error) {
      throw new BadRequestError("Error al obtener los torneos");
    }
  },

  async getTournamentById(id) {
    const tournament = await tournamentRepository.findOne({
      where: { id },
      relations: ["tournamentCategories", "tournamentCategories.category"],
    });

    if (!tournament) throw new NotFoundError("Torneo no encontrado");
    return tournament;
  },

  async assignCategoriesToTournament(tournamentId, categoryIds) {
    const tournament = await tournamentRepository.findOne({
      where: { id: tournamentId },
      relations: ["tournamentCategories", "tournamentCategories.category"],
    });

    if (!tournament) throw new NotFoundError("Torneo no encontrado");

    const categories = await categoryRepository.findByIds(categoryIds);
    if (categories.length !== categoryIds.length)
      throw new BadRequestError("Una o más categorías no existen");

    const tournamentCategories = categories.map((category) => ({
      tournament,
      category,
    }));

    await AppDataSource.getRepository("TournamentCategory").save(tournamentCategories);

    return {
      id: tournament.id,
      name: tournament.name,
      location: tournament.location,
      maxChefs: tournament.maxChefs,
      categories: tournamentCategories.map((tc) => tc.category.name),
    };
  },
};
