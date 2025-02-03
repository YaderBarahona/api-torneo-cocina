import { AppDataSource } from "../config/database.js";
import Chef from "../database/entities/chef.entity.js";

const chefRepository = AppDataSource.getRepository(Chef);

export const ChefService = {
  async createChef(data) {
    const chef = chefRepository.create(data);
    await chefRepository.save(chef);
    return chef;
  },

  async getAllChefs() {
    return await chefRepository.find();
  },

  async getChefById(id) {
    return await chefRepository.findOneBy({ id });
  },
};
