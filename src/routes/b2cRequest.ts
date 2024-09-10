import express from 'express';
import { createB2CRequest, getAllB2CRequests } from '../controllers/b2cRequestController';

const router = express.Router();

router.post('/', createB2CRequest);
router.get('/', getAllB2CRequests);

router.get('/clock',getClock );


function getClock(res:any,req:any){
    res.status(200).json("data")
    console.log("clock");
    
}
export default router;
