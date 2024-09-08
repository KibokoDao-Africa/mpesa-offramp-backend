import db from '../models';
import b2cRequestService from './b2cRequestService';

const createOfframpTransaction = async (data: any) => {
  const transaction = await db.OfframpTransaction.create(data);
  return transaction;
};

const getAllOfframpTransactions = async () => {
  const transactions = await db.OfframpTransaction.findAll();
  return transactions;
};

const updateOfframpTransactionStatus = async (id: string, status: 'initiated' | 'unprocessed' | 'completed') => {
  const transaction = await db.OfframpTransaction.findByPk(id);
  if (transaction) {
    transaction.status = status;
    await transaction.save();
  }
  return transaction;
};

const handleOnchainTransaction = async (data: any) => {
  const onchainTransaction = await db.OfframpOnchainTransaction.create(data);

  // Update the related transaction's status to "unprocessed"
  await updateOfframpTransactionStatus(onchainTransaction.transactionId, 'unprocessed');

  // Trigger the B2C request service to send money
  const transaction = await db.OfframpTransaction.findByPk(onchainTransaction.transactionId);
  if (transaction) {
    await b2cRequestService.createB2CRequest({
      transactionId: transaction.id,
      mpesaNumber: transaction.mpesaNumber,
      amount: transaction.amount,
    });
  }

  return onchainTransaction;
};



export default { createOfframpTransaction, getAllOfframpTransactions, updateOfframpTransactionStatus, handleOnchainTransaction };
