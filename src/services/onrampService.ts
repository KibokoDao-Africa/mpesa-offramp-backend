import db from '../models';
import { performSTKPush } from '../utils/safaricom';

export const createOnrampTransaction = async (data: any) => {
  console.log("Creating Onramp Transaction:", data);
  const transaction = await db.OnrampTransaction.create(data);
  console.log("Onramp Transaction Created:", transaction);

  const response = await performSTKPush(transaction.phoneNumber, transaction.amount);
  console.log("STK Push Response:", response);

  if (response.statusCode === 200) {
    await db.STKPushRequest.create({
      transactionId: transaction.id,
      requestId: response.data.requestId,
      status: 'pending',
    });
    console.log("STK Push Request Created:", response.data.requestId);

    transaction.status = 'unprocessed';
    await transaction.save();
    console.log("Updated Onramp Transaction Status to Unprocessed:", transaction);

    await callOnrampSmartContract(transaction.id);
    console.log("Called Onramp Smart Contract:", transaction.id);
  }

  return transaction;
};

export const handleOnchainTransaction = async (data: any) => {
  console.log("Handling Onchain Transaction:", data);
  await db.OnrampOnchainTransaction.create(data);
  console.log("Created Onchain Transaction:", data);

  const transaction = await db.OnrampTransaction.findByPk(data.transactionId);
  if (transaction) {
    transaction.status = 'completed';
    await transaction.save();
    console.log("Updated Onramp Transaction Status to Completed:", transaction);
  }
};

export const updateStatus = async (transactionId: string, status: 'initiated' | 'unprocessed' | 'completed') => {
  console.log(`Updating Onramp Transaction Status: ID=${transactionId}, Status=${status}`);
  const transaction = await db.OnrampTransaction.findByPk(transactionId);
  if (!transaction) {
    console.error('Transaction not found');
    throw new Error('Transaction not found');
  }
  transaction.status = status;
  await transaction.save();
  console.log("Updated Onramp Transaction Status:", transaction);
  return transaction;
};

function callOnrampSmartContract(id: string) {
  console.log(`Calling Onramp Smart Contract: ID=${id}`);
  throw new Error('Function not implemented.');
}
