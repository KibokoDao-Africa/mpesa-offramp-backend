import { Request, Response } from 'express';
import buyGoodsService from '../services/buyGoodsService';

export const createBuyGoodsRequest = async (req: Request, res: Response) => {
  const buyGoodsRequest = await buyGoodsService.createBuyGoodsRequest(req.body);
  res.status(201).json(buyGoodsRequest);
};

export const getAllBuyGoodsRequests = async (req: Request, res: Response) => {
  const buyGoodsRequests = await buyGoodsService.getAllBuyGoodsRequests();
  res.status(200).json(buyGoodsRequests);
};
