import express from 'express';
import {
  getCashBalance,
  getCashHistory,
  recordCashFlow,
  deleteCashFlow,
  getCashSummary,
} from '../controllers/cashController.js';

const router = express.Router();

router.get('/balance', getCashBalance);
router.get('/summary', getCashSummary);
router.get('/history', getCashHistory);
router.post('/', recordCashFlow);
router.delete('/:id', deleteCashFlow);

export default router;
