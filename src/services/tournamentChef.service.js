import { AppDataSource } from "../config/database.js";
import TournamentChef from "../database/entities/tournamentChef.entity.js";
import Tournament from "../database/entities/tournament.entity.js";
import Chef from "../database/entities/chef.entity.js"; 
import { NotFoundError, BadRequestError, ConflictError } from "../errors/AppError.js";

const tournamentChefRepository = AppDataSource.getRepository(TournamentChef);
const tournamentRepository = AppDataSource.getRepository(Tournament);
const chefRepository = AppDataSource.getRepository(Chef);


export const TournamentChefService = {
  async registerChefToTournament(tournamentId, chefId) {
    const tournament = await tournamentRepository.findOneBy({ id: tournamentId });
    if (!tournament) throw new NotFoundError("Torneo no encontrado"); 

    const chef = await chefRepository.findOneBy({ id: chefId });
    if (!chef) throw new NotFoundError("Chef no encontrado"); 

    const count = await tournamentChefRepository.count({ where: { tournament: { id: tournamentId } } });
    if (count >= tournament.maxChefs) throw new ConflictError("El torneo ya está lleno"); 

    const existingRegistration = await tournamentChefRepository.findOne({
      where: { tournament: { id: tournamentId }, chef: { id: chefId } },
    });
    if (existingRegistration) throw new ConflictError("El chef ya está registrado en este torneo"); 

    const tournamentChef = tournamentChefRepository.create({
      tournament: { id: tournamentId },
      chef: { id: chefId },
    });

    await tournamentChefRepository.save(tournamentChef);
    return tournamentChef;
  },
};

