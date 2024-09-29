import { Request, Response } from 'express';
import { createOfframpTransaction, updateOfframpTransactionStatus } from '../services/offrampService';

export const createOfframpTransactionHandler = async (req: Request, res: Response) => {
  try {
    console.log("Received request to create offramp transaction:", req.body);
    const transaction = await createOfframpTransaction(req.body);
    console.log("Successfully created offramp transaction:", transaction);
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating offramp transaction:", error);
    res.status(500).json({ error: 'Failed to create offramp transaction' });
  }
};

export const updateOfframpTransactionStatusHandler = async (req: Request, res: Response) => {
  try {
    console.log("Received request to update offramp transaction status:", req.body);
    const { transactionId, status } = req.body;
    const transaction = await updateOfframpTransactionStatus(transactionId, status);
    console.log("Successfully updated offramp transaction status:", transaction);
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error updating offramp transaction status:", error);
    res.status(500).json({ error: 'Failed to update offramp transaction status' });
  }
};
