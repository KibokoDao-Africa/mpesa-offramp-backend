import { Request, Response } from 'express';
import { createSTKPushRequest as createRequest, getAllSTKPushRequests as getAllRequests } from '../services/stkPushService';

export const createSTKPushRequest = async (req: Request, res: Response) => {
  try {
    const stkPushRequest = await createRequest(req.body);
    res.status(201).json(stkPushRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create STK Push request' });
  }
};

export const getAllSTKPushRequests = async (req: Request, res: Response) => {
  try {
    const stkPushRequests = await getAllRequests();
    res.status(200).json(stkPushRequests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve STK Push requests' });
  }
};
