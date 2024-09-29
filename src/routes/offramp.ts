import express from 'express';
import { createOfframpTransactionHandler, updateOfframpTransactionStatusHandler } from '../controllers/offrampController';

const router = express.Router();

router.post('/', createOfframpTransactionHandler);
router.put('/status', updateOfframpTransactionStatusHandler);

export default router;
