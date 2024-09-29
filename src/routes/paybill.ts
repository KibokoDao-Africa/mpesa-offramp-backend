import express from 'express';
import { createPaybillTransactionHandler, updatePaybillTransactionStatusHandler } from '../controllers/paybillController';

const router = express.Router();

router.post('/', createPaybillTransactionHandler);
router.put('/status', updatePaybillTransactionStatusHandler);

export default router;
