import { Router } from 'express';
import { createSTKPushRequest, getAllSTKPushRequests } from '../controllers/stkPushController';

const router = Router();

router.post('/', createSTKPushRequest);
router.get('/', getAllSTKPushRequests);

export default router;
