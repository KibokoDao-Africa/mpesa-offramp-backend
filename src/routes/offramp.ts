import express from 'express';
import { createOfframpTransaction, updateOfframpTransactionStatus } from '../controllers/offrampController';

const router = express.Router();

router.post('/', createOfframpTransaction);
router.put('/status', updateOfframpTransactionStatus);

export default router;
