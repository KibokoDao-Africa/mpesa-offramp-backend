import { Request, Response } from 'express';
import buyGoodsService from '../services/buyGoodsService';

export const createBuyGoodsTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await buyGoodsService.createBuyGoodsTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Buy Goods transaction' });
  }
};

export const updateBuyGoodsTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { transactionId, status } = req.body;
    const transaction = await buyGoodsService.updateBuyGoodsStatus(transactionId, status);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Buy Goods transaction status' });
  }
};
