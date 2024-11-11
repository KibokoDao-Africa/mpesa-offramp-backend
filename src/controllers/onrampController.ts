import { Request, Response } from 'express';
import { createOnrampTransaction as createTransactionService, updateStatus } from '../services/onrampService';

// Controller to create a new onramp transaction and trigger STK Push
export const createOnrampTransaction = async (req: Request, res: Response) => {
  try {
    console.log("Received request to create onramp transaction:", req.body);

    const { phoneNumber, amount, crypto, noOfTokens } = req.body;

    // Validate request body
    if (!phoneNumber || !amount || !crypto || !noOfTokens) {
      console.error("Missing required fields in request body:", req.body);
      return res.status(400).json({ error: 'Missing required fields: phoneNumber, amount, crypto, or noOfTokens.' });
    }

    // Use the imported service function to create the transaction
    const transaction = await createTransactionService(req.body);
    console.log("Successfully created onramp transaction and triggered STK Push:", transaction);

    return res.status(201).json(transaction);
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

      return res.status(500).json({ error: 'Failed to create onramp transaction', details: error.message });
    } else {
      console.error("Unknown error creating onramp transaction");
      return res.status(500).json({ error: 'Failed to create onramp transaction' });
    }
  }
};

// Controller to update the status of an existing onramp transaction
export const updateOnrampTransactionStatus = async (req: Request, res: Response) => {
  try {
    console.log("Received request to update onramp transaction status:", req.body);

    const { transactionId, status } = req.body;

    // Validate request body
    if (!transactionId || !status) {
      console.error("Missing required fields in request body:", req.body);
      return res.status(400).json({ error: 'Missing required fields: transactionId or status.' });
    }

    // Use the imported service function to update the status
    const transaction = await updateStatus(transactionId, status);
    console.log("Successfully updated onramp transaction status:", transaction);

    return res.status(200).json(transaction);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating onramp transaction status:", {
        message: error.message,
        stack: error.stack,
        body: req.body,
      });

      return res.status(500).json({ error: 'Failed to update onramp transaction status', details: error.message });
    } else {
      console.error("Unknown error updating onramp transaction status");
      return res.status(500).json({ error: 'Failed to update onramp transaction status' });
    }
  }
};
