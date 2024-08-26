import { Request, Response } from 'express';
import offrampService from '../services/offrampService';

export const createOfframpTransaction = async (req: Request, res: Response) => {
  const transaction = await offrampService.createOfframpTransaction(req.body);
  res.status(201).json(transaction);
};

export const getAllOfframpTransactions = async (req: Request, res: Response) => {
  const transactions = await offrampService.getAllOfframpTransactions();
  res.status(200).json(transactions);
};
