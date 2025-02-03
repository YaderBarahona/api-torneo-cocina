import express from "express";
import chefRoutes from "./chef.routes.js";
import tournamentRoutes from "./tournament.routes.js";
import tournamentChefRoutes from "./tournamentChef.routes.js";
import rankingRoutes from "./ranking.routes.js";
import scoreRoutes from "./score.routes.js";
import categoryRoutes from "./category.routes.js";
import authRoutes from "./auth.routes.js";
import { authenticateToken } from "../middlewares/validateToken.middleware.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/chefs", authenticateToken, chefRoutes);
router.use("/tournaments", authenticateToken, tournamentRoutes);
router.use("/tournaments", authenticateToken, tournamentChefRoutes);
router.use("/tournaments", authenticateToken, rankingRoutes);
router.use("/tournaments", authenticateToken, scoreRoutes);
router.use("/categories", authenticateToken, categoryRoutes);

export default router;
