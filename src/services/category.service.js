import { AppDataSource } from "../config/database.js";
import Category from "../database/entities/category.entity.js";
import { ConflictError } from "../errors/AppError.js";

const categoryRepository = AppDataSource.getRepository(Category); 

export const CategoryService = {
  async createCategory(name) {
    const existingCategory = await categoryRepository.findOne({ where: { name } });
    if (existingCategory) throw new ConflictError("La categoría ya existe");

    const category = categoryRepository.create({ name });
    await categoryRepository.save(category);
    return category;
  },

  async getAllCategories() {
    return await categoryRepository.find();
  },
};
