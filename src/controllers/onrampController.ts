import { Request, Response } from 'express';
import { createOnrampTransaction as createTransaction, updateStatus } from '../services/onrampService';

export const createOnrampTransaction = async (req: Request, res: Response) => {
  try {
    console.log("Received request to create onramp transaction:", req.body);

    // Validate request body
    if (!req.body.phoneNumber || !req.body.amount || !req.body.crypto || !req.body.noOfTokens) {
      console.error("Missing required fields in request body:", req.body);
      return res.status(400).json({ error: 'Missing required fields: phoneNumber, amount, crypto, or noOfTokens.' });
    }

    const transaction = await createTransaction(req.body);
    console.log("Successfully created onramp transaction:", transaction);

    res.status(201).json(transaction);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating onramp transaction:", {
        message: error.message,
        stack: error.stack,
        body: req.body,
      });

      if ((error as any).name === 'SequelizeValidationError') {
        return res.status(400).json({ error: 'Validation error', details: (error as any).errors });
      }

      res.status(500).json({ error: 'Failed to create onramp transaction', details: error.message });
    } else {
      console.error("Unknown error creating onramp transaction");
      res.status(500).json({ error: 'Failed to create onramp transaction' });
    }
  }
};

export const updateOnrampTransactionStatus = async (req: Request, res: Response) => {
  try {
    console.log("Received request to update onramp transaction status:", req.body);

    const { transactionId, status } = req.body;

    // Validate request body
    if (!transactionId || !status) {
      console.error("Missing required fields in request body:", req.body);
      return res.status(400).json({ error: 'Missing required fields: transactionId or status.' });
    }

    const transaction = await updateStatus(transactionId, status);
    console.log("Successfully updated onramp transaction status:", transaction);

    res.status(200).json(transaction);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating onramp transaction status:", {
        message: error.message,
        stack: error.stack,
        body: req.body,
      });

      res.status(500).json({ error: 'Failed to update onramp transaction status', details: error.message });
    } else {
      console.error("Unknown error updating onramp transaction status");
      res.status(500).json({ error: 'Failed to update onramp transaction status' });
    }
  }
};
