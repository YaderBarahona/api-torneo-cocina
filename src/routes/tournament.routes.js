import express from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { tournamentSchema } from "../validation/tournament.validation.js";
import { TournamentController } from "../controllers/tournament.controller.js";

const router = express.Router();

router.post("/", validate(tournamentSchema), TournamentController.createTournament);
router.get("/", TournamentController.getAllTournaments);
router.get("/:id", TournamentController.getTournamentById);
router.post("/:id/categories", TournamentController.assignCategories);

export default router;
