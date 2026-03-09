import express from 'express';
import {
  getAttendanceByGame,
  recordAttendance,
  updateAttendance,
  deleteAttendance,
  getPlayerStats,
} from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/game/:gameId', getAttendanceByGame);
router.post('/', recordAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);
router.get('/stats/:playerId', getPlayerStats);

export default router;
