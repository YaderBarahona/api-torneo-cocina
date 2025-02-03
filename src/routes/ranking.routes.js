import express from "express";
import { RankingController } from "../controllers/ranking.controller.js";

const router = express.Router();

router.get("/:id/ranking", RankingController.getRanking);

export default router;
