import { Request, Response } from 'express';
import { createBuyGoodsTransaction, updateBuyGoodsStatus } from '../services/buyGoodsService';

export const createBuyGoodsTransactionHandler = async (req: Request, res: Response) => {
  try {
    console.log("Received request to create Buy Goods Transaction:", req.body);
    const transaction = await createBuyGoodsTransaction(req.body);
    console.log("Buy Goods Transaction created successfully:", transaction);
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating Buy Goods Transaction:", error);
    res.status(500).json({ error: 'Failed to create Buy Goods transaction' });
  }
};

export const updateBuyGoodsTransactionStatusHandler = async (req: Request, res: Response) => {
  try {
    console.log("Received request to update Buy Goods Transaction Status:", req.body);
    const { transactionId, status } = req.body;
    const transaction = await updateBuyGoodsStatus(transactionId, status);
    console.log("Buy Goods Transaction status updated successfully:", transaction);
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error updating Buy Goods Transaction Status:", error);
    res.status(500).json({ error: 'Failed to update Buy Goods transaction status' });
  }
};
