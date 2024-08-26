import { Request, Response } from 'express';
import paybillService from '../services/paybillService';

export const createPaybillRequest = async (req: Request, res: Response) => {
  const paybillRequest = await paybillService.createPaybillRequest(req.body);
  res.status(201).json(paybillRequest);
};

export const getAllPaybillRequests = async (req: Request, res: Response) => {
  const paybillRequests = await paybillService.getAllPaybillRequests();
  res.status(200).json(paybillRequests);
};
