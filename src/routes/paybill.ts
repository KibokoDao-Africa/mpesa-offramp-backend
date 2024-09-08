import express from 'express';
import { createPaybillTransaction, updatePaybillTransactionStatus } from '../controllers/paybillController';

const router = express.Router();

router.post('/', createPaybillTransaction);
router.put('/status', updatePaybillTransactionStatus);

export default router;
