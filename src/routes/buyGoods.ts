import express from 'express';
import { createBuyGoodsTransaction, updateBuyGoodsTransactionStatus } from '../controllers/buyGoodsController';

const router = express.Router();

router.post('/', createBuyGoodsTransaction);
router.put('/status', updateBuyGoodsTransactionStatus);

export default router;
