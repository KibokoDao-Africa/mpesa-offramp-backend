import { Router } from 'express';
import { createBuyGoodsRequest, getAllBuyGoodsRequests } from '../controllers/buyGoodsController';

const router = Router();

router.post('/', createBuyGoodsRequest);
router.get('/', getAllBuyGoodsRequests);

export default router;
