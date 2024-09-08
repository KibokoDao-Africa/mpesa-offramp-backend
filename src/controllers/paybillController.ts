import { Request, Response } from 'express';
import paybillService from '../services/paybillService';

export const createPaybillTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await paybillService.createPaybillTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Paybill transaction' });
  }
};

export const updatePaybillTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { transactionId, status } = req.body;
    const transaction = await paybillService.updatePaybillTransactionStatus(transactionId, status);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Paybill transaction status' });
  }
};
