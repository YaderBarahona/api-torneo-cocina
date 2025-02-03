import express from "express";
import { ScoreController } from "../controllers/score.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { scoreSchema } from "../validation/score.validation.js";

const router = express.Router();

router.post("/:id/submit", validate(scoreSchema), ScoreController.submitScore);

export default router;
