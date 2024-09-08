import { Request, Response } from 'express';
import stkPushService from '../services/stkPushService';

export const createSTKPushRequest = async (req: Request, res: Response) => {
  try {
    const stkPushRequest = await stkPushService.createSTKPushRequest(req.body);
    res.status(201).json(stkPushRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create STK Push request' });
  }
};

export const getAllSTKPushRequests = async (req: Request, res: Response) => {
  try {
    const stkPushRequests = await stkPushService.getAllSTKPushRequests();
    res.status(200).json(stkPushRequests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve STK Push requests' });
  }
};
