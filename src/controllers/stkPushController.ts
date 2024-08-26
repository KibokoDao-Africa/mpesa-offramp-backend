import { Request, Response } from 'express';
import stkPushService from '../services/stkPushService';

export const createSTKPushRequest = async (req: Request, res: Response) => {
  const stkPushRequest = await stkPushService.createSTKPushRequest(req.body);
  res.status(201).json(stkPushRequest);
};

export const getAllSTKPushRequests = async (req: Request, res: Response) => {
  const stkPushRequests = await stkPushService.getAllSTKPushRequests();
  res.status(200).json(stkPushRequests);
};
