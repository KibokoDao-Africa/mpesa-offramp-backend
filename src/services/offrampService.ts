import db from '../models';
import { createB2CRequest } from './b2cRequestService';

export const createOfframpTransaction = async (data: any) => {
  console.log("Creating Offramp Transaction:", data);
  const transaction = await db.OfframpTransaction.create(data);
  console.log("Created Offramp Transaction:", transaction);
  return transaction;
};

export const getAllOfframpTransactions = async () => {
  console.log("Fetching all Offramp Transactions");
  const transactions = await db.OfframpTransaction.findAll();
  console.log("Fetched Offramp Transactions:", transactions);
  return transactions;
};

export const updateOfframpTransactionStatus = async (id: string, status: 'initiated' | 'unprocessed' | 'completed') => {
  console.log(`Updating Offramp Transaction Status: ID=${id}, Status=${status}`);
  const transaction = await db.OfframpTransaction.findByPk(id);
  if (transaction) {
    transaction.status = status;
    await transaction.save();
    console.log("Updated Offramp Transaction Status:", transaction);
  }
  return transaction;
};

export const handleOnchainTransaction = async (data: any) => {
  console.log("Handling On-chain Offramp Transaction:", data);
  const onchainTransaction = await db.OfframpOnchainTransaction.create(data);
  console.log("Created On-chain Offramp Transaction:", onchainTransaction);

  await updateOfframpTransactionStatus(onchainTransaction.transactionId, 'unprocessed');

  const transaction = await db.OfframpTransaction.findByPk(onchainTransaction.transactionId);
  if (transaction) {
    await createB2CRequest({
      transactionId: transaction.id,
      mpesaNumber: transaction.mpesaNumber,
      amount: transaction.amount,
    });
  }

  return onchainTransaction;
};
