import { RankingService } from "../services/ranking.service.js";
import { AppError } from "../errors/AppError.js";

export const RankingController = {
  async getRanking(req, res) {
    try {
      const rankingData = await RankingService.getTournamentRanking(req.params.id);

      res.json({
        tournament: rankingData.tournament,
        location: rankingData.location,
        categories: rankingData.categories,
        ranking: rankingData.ranking,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },
};
