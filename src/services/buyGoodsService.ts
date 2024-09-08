import db from '../models';
import { processBuyGoodsPayment } from '../utils/safaricom';

const createBuyGoodsTransaction = async (data: any) => {
  const transaction = await db.BuyGoodsTransaction.create(data);

  await callBuyGoodsSmartContract(transaction.id);

  transaction.status = 'unprocessed';
  await transaction.save();

  return transaction;
};

const handleOnchainTransaction = async (data: any) => {
  await db.BuyGoodsOnchainTransaction.create(data);

  const transaction = await db.BuyGoodsTransaction.findByPk(data.transactionId);
  if (transaction) {
    transaction.status = 'completed';
    await transaction.save();

    await processBuyGoodsPayment(transaction.tillNumber, transaction.amount);
  }
};

const updateBuyGoodsStatus = async (transactionId: string, status: 'initiated' | 'unprocessed' | 'completed') => {
  const transaction = await db.BuyGoodsTransaction.findByPk(transactionId);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  transaction.status = status;
  await transaction.save();
  return transaction;
};

export default { createBuyGoodsTransaction, handleOnchainTransaction, updateBuyGoodsStatus };

function callBuyGoodsSmartContract(id: string) {
  throw new Error('Function not implemented.');
}
