import { Request, Response } from 'express';
import { createSTKPushRequest as createRequest, getAllSTKPushRequests as getAllRequests } from '../services/stkPushService';

export const createSTKPushRequest = async (req: Request, res: Response) => {
  try {
    console.log("Received request to create STK Push:", req.body);
    const stkPushRequest = await createRequest(req.body);
    console.log("Successfully created STK Push Request:", stkPushRequest);
    res.status(201).json(stkPushRequest);
  } catch (error) {
    console.error("Error creating STK Push request:", error);
    res.status(500).json({ error: 'Failed to create STK Push request' });
  }
};

export const getAllSTKPushRequests = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all STK Push requests");
    const stkPushRequests = await getAllRequests();
    console.log("Successfully fetched STK Push requests:", stkPushRequests);
    res.status(200).json(stkPushRequests);
  } catch (error) {
    console.error("Error retrieving STK Push requests:", error);
    res.status(500).json({ error: 'Failed to retrieve STK Push requests' });
  }
};
