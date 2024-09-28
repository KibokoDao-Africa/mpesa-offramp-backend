import { Request, Response } from 'express';
import { createOnrampTransaction as createTransaction, updateStatus } from '../services/onrampService';

export const createOnrampTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await createTransaction(req.body);
    console.log(transaction.response);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create onramp transaction' });
  }
};

export const updateOnrampTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { transactionId, status } = req.body;
    const transaction = await updateStatus(transactionId, status);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update onramp transaction status' });
  }
};
