import { EntitySchema } from "typeorm";
import Tournament from "./tournament.entity.js";
import Chef from "./chef.entity.js";

export default new EntitySchema({
  name: "TournamentChef",
  tableName: "tournament_chefs",
  columns: {
    id: { primary: true, type: "int", generated: true },
    score: { type: "int", nullable: true }, 
  },
  relations: {
    tournament: {
      target: Tournament,
      type: "many-to-one",
      joinColumn: { name: "tournamentId" },
      cascade: true,
      onDelete: "CASCADE",
    },
    chef: {
      target: Chef,
      type: "many-to-one",
      joinColumn: { name: "chefId" },
      cascade: true,
      onDelete: "CASCADE",
    },
  },
});
