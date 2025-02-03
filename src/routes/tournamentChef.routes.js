import express from "express";
import { TournamentChefController } from "../controllers/tournamentChef.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { tournamentChefSchema } from "../validation/tournamentChef.validation.js";

const router = express.Router();

router.post(
  "/:id/register",
  validate(tournamentChefSchema),
  TournamentChefController.registerChef
);

export default router;
