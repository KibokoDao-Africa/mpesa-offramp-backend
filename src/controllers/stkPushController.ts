import { Request, Response } from 'express';
import { createSTKPushRequest as createRequest, getAllSTKPushRequests as getAllRequests } from '../services/stkPushService';

// Controller to create an STK Push request
export const createSTKPushRequest = async (req: Request, res: Response) => {
  try {
    const { amount, phoneNumber } = req.body;

    // Validate that 'amount' is a number and greater than or equal to 1
    if (isNaN(amount) || amount < 1) {
      return res.status(400).json({ error: 'Invalid amount: Amount should be a number and at least 1.' });
    }

    // Validate that 'phoneNumber' is in the correct format
    const phoneRegex = /^2547\d{8}$/; // Regular expression to match Kenyan phone numbers (2547XXXXXXXX)
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ error: 'Invalid phoneNumber: PhoneNumber should be in the format 2547XXXXXXXX.' });
    }

    console.log("Received request to create STK Push:", req.body);

    // Call the service function to create the STK Push request
    const stkPushRequest = await createRequest({ phoneNumber, amount, transactionId: req.body.transactionId });
    console.log("Successfully created STK Push Request:", stkPushRequest);

    res.status(201).json(stkPushRequest);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating STK Push request:", error.message);
      res.status(500).json({ error: 'Failed to create STK Push request', details: error.message });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Controller to fetch all STK Push requests
export const getAllSTKPushRequests = async (_req: Request, res: Response) => {
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
