import { Request, Response } from 'express';
import { createPaybillTransaction, updatePaybillTransactionStatus } from '../services/paybillService';

export const createPaybillTransactionHandler = async (req: Request, res: Response) => {
  try {
    console.log("Received request to create Paybill transaction:", req.body);
    const transaction = await createPaybillTransaction(req.body);
    console.log("Successfully created Paybill transaction:", transaction);
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating Paybill transaction:", error);
    res.status(500).json({ error: 'Failed to create Paybill transaction' });
  }
};

export const updatePaybillTransactionStatusHandler = async (req: Request, res: Response) => {
  try {
    console.log("Received request to update Paybill transaction status:", req.body);
    const { transactionId, status } = req.body;
    const transaction = await updatePaybillTransactionStatus(transactionId, status);
    console.log("Successfully updated Paybill transaction status:", transaction);
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error updating Paybill transaction status:", error);
    res.status(500).json({ error: 'Failed to update Paybill transaction status' });
  }
};
