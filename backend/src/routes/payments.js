import express from 'express';
import {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentSummary,
} from '../controllers/paymentController.js';

const router = express.Router();

router.get('/', getAllPayments);
router.get('/summary', getPaymentSummary);
router.post('/', createPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

export default router;
