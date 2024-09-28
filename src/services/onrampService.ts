import db from '../models';
import { performSTKPush } from '../utils/safaricom';

export const createOnrampTransaction = async (data: any) => {
  const transaction = await db.OnrampTransaction.create(data);
  const response = await performSTKPush(transaction.phoneNumber, transaction.amount);

  if (response.statusCode === 200) {
    await db.STKPushRequest.create({
      transactionId: transaction.id,
      requestId: response.data.requestId,
      status: 'pending',
    });

    transaction.status = 'unprocessed';
    await transaction.save();

    await callOnrampSmartContract(transaction.id);
  }

  return transaction;
};

export const handleOnchainTransaction = async (data: any) => {
  await db.OnrampOnchainTransaction.create(data);

  const transaction = await db.OnrampTransaction.findByPk(data.transactionId);
  if (transaction) {
    transaction.status = 'completed';
    await transaction.save();
  }
};

export const updateStatus = async (transactionId: string, status: 'initiated' | 'unprocessed' | 'completed') => {
  const transaction = await db.OnrampTransaction.findByPk(transactionId);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  transaction.status = status;
  await transaction.save();
  return transaction;
};

function callOnrampSmartContract(id: string) {
  throw new Error('Function not implemented.');
}
