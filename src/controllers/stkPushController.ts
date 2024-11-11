import { Request, Response } from 'express';
import { createSTKPushRequest as createRequest, getAllSTKPushRequests as getAllRequests } from '../services/stkPushService';

export const createSTKPushRequest = async (req: Request, res: Response) => {
  try {
    const { Amount, PhoneNumber } = req.body;

    // Ensure that Amount is a number and greater than or equal to 1
    if (isNaN(Amount) || Amount < 1) {
      return res.status(400).json({ error: 'Invalid Amount: Amount should be a number and at least 1.' });
    }
     // Ensure that PhoneNumber is valid
  const phoneRegex = /^2547\d{8}$/;  // Regular expression to match Kenyan phone numbers in international format (2547XXXXXXXX)
  if (!PhoneNumber || !phoneRegex.test(PhoneNumber)) {
    return res.status(400).json({ error: 'Invalid PhoneNumber: PhoneNumber should be in the format 2547XXXXXXXX.' });
  }


    console.log("Received request to create STK Push:", req.body);
    const stkPushRequest = await createRequest({ Amount, PhoneNumber });
    console.log("Successfully created STK Push Request:", stkPushRequest);
    res.status(201).json(stkPushRequest);
  } catch (error) {
    // Handle the error more robustly, checking for known error types
    if (error instanceof Error) {
      console.error("Error creating STK Push request:", error.message);
      res.status(500).json({ error: 'Failed to create STK Push request', details: error.message });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getAllSTKPushRequests = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all STK Push requests");
    const stkPushRequests = await getAllRequests();
    console.log("Successfully fetched STK Push requests:", stkPushRequests);
    res.status(200).json(stkPushRequests);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving STK Push requests:", error.message);
      res.status(500).json({ error: 'Failed to retrieve STK Push requests', details: error.message });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
