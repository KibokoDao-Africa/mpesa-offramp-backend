import express from 'express';
import { createBuyGoodsTransactionHandler, updateBuyGoodsTransactionStatusHandler } from '../controllers/buyGoodsController';

const router = express.Router();

router.post('/', createBuyGoodsTransactionHandler);
router.put('/status', updateBuyGoodsTransactionStatusHandler);

export default router;
