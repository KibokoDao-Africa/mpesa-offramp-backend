import { Router } from 'express';
import { createOfframpTransaction, getAllOfframpTransactions } from '../controllers/offrampController';

const router = Router();

router.post('/', createOfframpTransaction);
router.get('/', getAllOfframpTransactions);

export default router;
