import express from 'express';
import { createB2CRequestHandler, getAllB2CRequestsHandler } from '../controllers/b2cRequestController';

const router = express.Router();

router.post('/', createB2CRequestHandler);
router.get('/', getAllB2CRequestsHandler);

router.get('/clock', getClock);

function getClock(req: express.Request, res: express.Response) {
    res.status(200).json("data");
    console.log("clock");
}

export default router;
