import { EntitySchema } from "typeorm";

const Category = new EntitySchema({
  name: "Category",
  tableName: "categories",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
      unique: true,
    },
  },
  relations: {
    tournamentCategories: {
      type: "one-to-many",
      target: "TournamentCategory",
      inverseSide: "category",
    },
  },
});

export default Category;
