import { EntitySchema } from "typeorm";

const Tournament = new EntitySchema({
  name: "Tournament",
  tableName: "tournaments",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
    },
    location: {
      type: "text",
    },
    maxChefs: {
      type: "int",
    },
  },
  relations: {
    tournamentCategories: {
      type: "one-to-many",
      target: "TournamentCategory",
      inverseSide: "tournament",
    },
  }
  
});

export default Tournament;
