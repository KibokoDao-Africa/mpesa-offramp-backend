import db from '../models';
import { performSTKPush } from '../utils/safaricom';

export const createOnrampTransaction = async (data: any) => {
  try {
    console.log("Creating onramp transaction with data:", data);
    const transaction = await db.OnrampTransaction.create(data);
    console.log("Onramp transaction created:", transaction);

    const response = await performSTKPush(transaction.phoneNumber, transaction.amount);
    console.log("STK Push response:", response);

    if (response.statusCode === 200) {
      await db.STKPushRequest.create({
        transactionId: transaction.id,
        requestId: response.data.requestId,
        status: 'pending',
      });

      transaction.status = 'unprocessed';
      await transaction.save();
      console.log("Onramp transaction updated to unprocessed:", transaction);

      await callOnrampSmartContract(transaction.id);
    }

    return transaction;
  } catch (error) {
    console.error("Error in creating onramp transaction:", error);
    throw error;
  }
};

export const handleOnchainTransaction = async (data: any) => {
  try {
    console.log("Handling on-chain transaction:", data);
    await db.OnrampOnchainTransaction.create(data);

    const transaction = await db.OnrampTransaction.findByPk(data.transactionId);
    if (transaction) {
      transaction.status = 'completed';
      await transaction.save();
      console.log("Onramp transaction marked as completed:", transaction);
    }
  } catch (error) {
    console.error("Error handling on-chain transaction:", error);
    throw error;
  }
};

export const updateStatus = async (transactionId: string, status: 'initiated' | 'unprocessed' | 'completed') => {
  try {
    console.log(`Updating onramp transaction status: ID=${transactionId}, Status=${status}`);
    const transaction = await db.OnrampTransaction.findByPk(transactionId);
    if (!transaction) {
      throw new Error(`Transaction with ID=${transactionId} not found`);
    }
    transaction.status = status;
    await transaction.save();
    console.log("Onramp transaction status updated:", transaction);
    return transaction;
  } catch (error) {
    console.error("Error updating onramp transaction status:", error);
    throw error;
  }
};

function callOnrampSmartContract(id: string) {
  console.log(`Calling smart contract for onramp transaction: ID=${id}`);
  throw new Error('Function not implemented.');
}
