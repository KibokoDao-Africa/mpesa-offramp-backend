import db from '../models';
import { performSTKPush } from '../utils/safaricom'

const createOnrampTransaction = async (data: any) => {
  const transaction = await db.OnrampTransaction.create(data);
  return transaction;
};

const getAllOnrampTransactions = async () => {
  const transactions = await db.OnrampTransaction.findAll();
  return transactions;
};

const updateOnrampTransactionStatus = async (id: string, status: 'initiated' | 'unprocessed' | 'completed') => {
  const transaction = await db.OnrampTransaction.findByPk(id);
  if (transaction) {
    transaction.status = status;
    await transaction.save();
  }
  return transaction;
};

const handleSTKPush = async (transactionId: string) => {
  const transaction = await db.OnrampTransaction.findByPk(transactionId);
  if (transaction) {
    const response = await performSTKPush(transaction.phoneNumber, transaction.amount);
    
    // Update status to unprocessed
    await updateOnrampTransactionStatus(transactionId, 'unprocessed');

    // Further steps: Call smart contract function and handle Onchain transaction
  }
};

const handleOnchainTransaction = async (data: any) => {
  const onchainTransaction = await db.OnrampOnchainTransaction.create(data);

  // Update the related transaction's status to "completed"
  await updateOnrampTransactionStatus(onchainTransaction.transactionId, 'completed');

  return onchainTransaction;
};

export default { createOnrampTransaction, getAllOnrampTransactions, updateOnrampTransactionStatus, handleSTKPush, handleOnchainTransaction };
