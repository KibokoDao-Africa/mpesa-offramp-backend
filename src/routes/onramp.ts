import express from 'express';
import { createOnrampTransaction, updateOnrampTransactionStatus } from '../controllers/onrampController';

const router = express.Router();

router.post('/', createOnrampTransaction);
router.put('/status', updateOnrampTransactionStatus);

export default router;
