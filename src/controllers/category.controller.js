import { CategoryService } from "../services/category.service.js";

export const CategoryController = {
  async createCategory(req, res) {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: "El nombre de la categoría es requerido" });

      const category = await CategoryService.createCategory(name);
      res.status(201).json({ message: "Categoría creada", data: category });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message || "Error interno del servidor" });
    }
  },

  async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json({ data: categories });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener categorías" });
    }
  },
};
