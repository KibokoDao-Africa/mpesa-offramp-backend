import { Request, Response } from 'express';
import b2cRequestService from '../services/b2cRequestService';

export const createB2CRequest = async (req: Request, res: Response) => {
  const b2cRequest = await b2cRequestService.createB2CRequest(req.body);
  res.status(201).json(b2cRequest);
};

export const getAllB2CRequests = async (req: Request, res: Response) => {
  const b2cRequests = await b2cRequestService.getAllB2CRequests();
  res.status(200).json(b2cRequests);
};
