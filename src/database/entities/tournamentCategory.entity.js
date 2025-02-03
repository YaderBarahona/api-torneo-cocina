import { EntitySchema } from "typeorm";

const TournamentCategory = new EntitySchema({
  name: "TournamentCategory",
  tableName: "tournament_categories",
  columns: {
    tournamentId: {
      primary: true,
      type: "int",
    },
    categoryId: {
      primary: true,
      type: "int",
    },
  },
  relations: {
    tournament: {
      type: "many-to-one",
      target: "Tournament",
      joinColumn: { name: "tournamentId" },
      onDelete: "CASCADE",
    },
    category: {
      type: "many-to-one",
      target: "Category",
      joinColumn: { name: "categoryId" },
      onDelete: "CASCADE",
    },
  },
});

export default TournamentCategory;
