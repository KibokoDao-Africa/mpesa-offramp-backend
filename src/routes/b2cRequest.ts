import { Router } from 'express';
import { createB2CRequest, getAllB2CRequests } from '../controllers/b2cRequestController';

const router = Router();

router.post('/', createB2CRequest);
router.get('/', getAllB2CRequests);

export default router;
