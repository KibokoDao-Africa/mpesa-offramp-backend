import db from '../models';
import { processBuyGoodsPayment } from '../utils/safaricom';

export const createBuyGoodsTransaction = async (data: any) => {
  console.log("Creating Buy Goods Transaction:", data);
  const transaction = await db.BuyGoodsTransaction.create(data);
  console.log("Created Buy Goods Transaction:", transaction);

  await callBuyGoodsSmartContract(transaction.id);
  transaction.status = 'unprocessed';
  await transaction.save();
  console.log("Updated Buy Goods Transaction to Unprocessed:", transaction);

  return transaction;
};

export const handleOnchainTransaction = async (data: any) => {
  console.log("Handling On-chain Transaction:", data);
  await db.BuyGoodsOnchainTransaction.create(data);

  const transaction = await db.BuyGoodsTransaction.findByPk(data.transactionId);
  if (transaction) {
    transaction.status = 'completed';
    await transaction.save();
    console.log("Updated Buy Goods Transaction to Completed:", transaction);

    await processBuyGoodsPayment(transaction.tillNumber, transaction.amount);
  }
};

export const updateBuyGoodsStatus = async (transactionId: string, status: 'initiated' | 'unprocessed' | 'completed') => {
  console.log(`Updating Buy Goods Transaction Status: ID=${transactionId}, Status=${status}`);
  const transaction = await db.BuyGoodsTransaction.findByPk(transactionId);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  transaction.status = status;
  await transaction.save();
  console.log("Updated Buy Goods Transaction Status:", transaction);
  return transaction;
};

export function callBuyGoodsSmartContract(id: string) {
  console.log(`Calling Buy Goods Smart Contract: ID=${id}`);
  throw new Error('Function not implemented.');
}
