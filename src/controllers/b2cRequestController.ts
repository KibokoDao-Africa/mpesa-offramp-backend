import { Request, Response } from 'express';
import b2cRequestService from '../services/b2cRequestService';

export const createB2CRequest = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const b2cRequest = await b2cRequestService.createB2CRequest(req.body);
   console.log(b2cRequest.response) 
    res.status(201).json(b2cRequest);
    

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create B2C request' });
    console.log(error);
  }
};

export const getAllB2CRequests = async (req: Request, res: Response) => {
  try {
    const b2cRequests = await b2cRequestService.getAllB2CRequests();
    res.status(200).json(b2cRequests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve B2C requests' });
  }
};
