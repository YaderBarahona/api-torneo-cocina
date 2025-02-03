import { ChefService } from "../services/chef.service.js";

export const ChefController = {
  async createChef(req, res) {
    try {
      const chef = await ChefService.createChef(req.body);
      res.status(201).json(chef);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllChefs(req, res) {
    const chefs = await ChefService.getAllChefs();
    res.json(chefs);
  },

  async getChefById(req, res) {
    const chef = await ChefService.getChefById(req.params.id);
    if (!chef) return res.status(404).json({ error: "Chef no encontrado" });
    res.json(chef);
  },
};
