import { Router } from 'express';
import { createPaybillRequest, getAllPaybillRequests } from '../controllers/paybillController';

const router = Router();

router.post('/', createPaybillRequest);
router.get('/', getAllPaybillRequests);

export default router;
