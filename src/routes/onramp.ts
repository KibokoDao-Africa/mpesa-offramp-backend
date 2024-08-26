import { Router } from 'express';
import { createOnrampTransaction, getAllOnrampTransactions } from '../controllers/onrampController';

const router = Router();

router.post('/', createOnrampTransaction);
router.get('/', getAllOnrampTransactions);

export default router;
