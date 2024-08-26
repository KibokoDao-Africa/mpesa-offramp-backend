import { Request, Response } from 'express';
import onrampService from '../services/onrampService';

export const createOnrampTransaction = async (req: Request, res: Response) => {
  const transaction = await onrampService.createOnrampTransaction(req.body);
  res.status(201).json(transaction);
};

export const getAllOnrampTransactions = async (req: Request, res: Response) => {
  const transactions = await onrampService.getAllOnrampTransactions();
  res.status(200).json(transactions);
};
