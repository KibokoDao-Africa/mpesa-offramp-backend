import db from '../models';
import { processPaybillPayment } from '../utils/safaricom';

export const createPaybillTransaction = async (data: any) => {
  const transaction = await db.PaybillTransaction.create(data);

  await callPaybillSmartContract(transaction.id);

  transaction.status = 'unprocessed';
  await transaction.save();

  return transaction;
};

export const handleOnchainTransaction = async (data: any) => {
  await db.PaybillOnchainTransaction.create(data);

  const transaction = await db.PaybillTransaction.findByPk(data.transactionId);
  if (transaction) {
    transaction.status = 'completed';
    await transaction.save();

    await processPaybillPayment(transaction.paybillNumber, transaction.amount, transaction.accountNumber);
  }
};

export const updatePaybillTransactionStatus = async (transactionId: string, status: 'initiated' | 'unprocessed' | 'completed') => {
  const transaction = await db.PaybillTransaction.findByPk(transactionId);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  transaction.status = status;
  await transaction.save();
  return transaction;
};

// You may want to implement this function or leave it as a placeholder for now
export function callPaybillSmartContract(id: string) {
  throw new Error('Function not implemented.');
}
