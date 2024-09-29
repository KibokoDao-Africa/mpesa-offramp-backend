import { Request, Response } from 'express';
import { createOnrampTransaction as createTransaction, updateStatus } from '../services/onrampService';

export const createOnrampTransaction = async (req: Request, res: Response) => {
  try {
    console.log("Received request to create onramp transaction:", req.body);
    const transaction = await createTransaction(req.body);
    console.log("Successfully created onramp transaction:", transaction);
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating onramp transaction:", error);
    res.status(500).json({ error: 'Failed to create onramp transaction' });
  }
};

export const updateOnrampTransactionStatus = async (req: Request, res: Response) => {
  try {
    console.log("Received request to update onramp transaction status:", req.body);
    const { transactionId, status } = req.body;
    const transaction = await updateStatus(transactionId, status);
    console.log("Successfully updated onramp transaction status:", transaction);
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error updating onramp transaction status:", error);
    res.status(500).json({ error: 'Failed to update onramp transaction status' });
  }
};
