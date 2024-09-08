import db from '../models';
import { performSTKPush } from '../utils/safaricom';

const createOnrampTransaction = async (data: any) => {
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

const handleOnchainTransaction = async (data: any) => {
  await db.OnrampOnchainTransaction.create(data);

  const transaction = await db.OnrampTransaction.findByPk(data.transactionId);
  if (transaction) {
    transaction.status = 'completed';
    await transaction.save();
  }
};

const updateStatus = async (transactionId: string, status: 'initiated' | 'unprocessed' | 'completed') => {
  const transaction = await db.OnrampTransaction.findByPk(transactionId);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  transaction.status = status;
  await transaction.save();
  return transaction;
};

export default { createOnrampTransaction, handleOnchainTransaction, updateStatus };

function callOnrampSmartContract(id: string) {
  throw new Error('Function not implemented.');
}
