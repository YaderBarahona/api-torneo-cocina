import "reflect-metadata";
import { DataSource } from "typeorm";
import Chef from "../database/entities/chef.entity.js";
import Tournament from "../database/entities/tournament.entity.js";
import TournamentChef from "../database/entities/tournamentChef.entity.js";
import Category from "../database/entities/category.entity.js";
import TournamentCategory from "../database/entities/tournamentCategory.entity.js";
import User from "../database/entities/user.entity.js"
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/data/database.sqlite",
  entities: [Chef, Tournament, TournamentChef, Category, TournamentCategory, User],
  migrations: ["src/database/migrations/*.js"],
  synchronize: false,
  logging: false,
});
