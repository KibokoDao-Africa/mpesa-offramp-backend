import { Router } from 'express';
import offrampRoutes from './offramp';
import onrampRoutes from './onramp';
import stkPushRoutes from './stkPush';
import b2cRoutes from './b2cRequest';
import paybillRoutes from './paybill';
import buyGoodsRoutes from './buyGoods';

const router = Router();

// Offramp-related routes
router.use('/offramp', offrampRoutes);

// Onramp-related routes
router.use('/onramp', onrampRoutes);

// STK Push-related routes
router.use('/stk-push', stkPushRoutes);

// B2C-related routes
router.use('/b2c', b2cRoutes);

// Paybill-related routes
router.use('/paybill', paybillRoutes);

// Buy Goods-related routes
router.use('/buy-goods', buyGoodsRoutes);

export default router;
