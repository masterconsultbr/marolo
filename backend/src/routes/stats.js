import express from 'express';
import {
  getTopScorers,
  getTopAssists,
  getPlayerStatistics,
} from '../controllers/statsController.js';

const router = express.Router();

router.get('/top-scorers', getTopScorers);
router.get('/top-assists', getTopAssists);
router.get('/player-stats', getPlayerStatistics);

export default router;
