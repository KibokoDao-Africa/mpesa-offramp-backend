import { Request, Response } from 'express';
import offrampService from '../services/offrampService';

export const createOfframpTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await offrampService.createOfframpTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create offramp transaction' });
  }
};

export const updateOfframpTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { transactionId, status } = req.body;
    const transaction = await offrampService.updateOfframpTransactionStatus(transactionId, status);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update offramp transaction status' });
  }
};
