import db from '../models';
import { performBuyGoodsTransaction } from '../utils/safaricom';

const createBuyGoodsRequest = async (data: any) => {
  const response = await performBuyGoodsTransaction(data.tillNumber, data.amount);
  const buyGoodsRequest = await db.BuyGoods.create({
    transactionId: data.transactionId,
    requestId: response.ConversationID,
    responseCode: response.ResponseCode,
    responseDescription: response.ResponseDescription,
    status: response.ResponseCode === '0' ? 'completed' : 'pending',
  });

  return buyGoodsRequest;
};

const getAllBuyGoodsRequests = async () => {
  const buyGoodsRequests = await db.BuyGoods.findAll();
  return buyGoodsRequests;
};

export default { createBuyGoodsRequest, getAllBuyGoodsRequests };
