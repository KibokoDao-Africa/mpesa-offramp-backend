import db from '../models';
import { performSTKPush } from '../utils/safaricom';
import { Model } from 'sequelize';

// Define the TransactionData interface to match the OnrampTransaction model
interface TransactionData {
  phoneNumber: string;
  amount: number;
  crypto: string;
  noOfTokens: number;
  status?: 'initiated' | 'unprocessed' | 'completed';
}

// Service to create a new onramp transaction and trigger STK Push
export const createOnrampTransaction = async (data: TransactionData) => {
  try {
    console.log("Creating onramp transaction with data:", data);

    // Ensure that the data object matches the OnrampTransaction model
    const transaction = await db.OnrampTransaction.create({
      phoneNumber: data.phoneNumber,
      amount: data.amount,
      crypto: data.crypto,
      noOfTokens: data.noOfTokens,
      status: data.status || 'initiated',
    });

    console.log("Onramp transaction created:", transaction);

    // Trigger STK Push immediately after transaction creation
    const response = await performSTKPush(transaction.phoneNumber, transaction.amount);
    console.log("STK Push response:", response);

    if (response.ResponseCode === '0') {
      // Update transaction status to 'unprocessed'
      transaction.status = 'unprocessed';
      await transaction.save();

      // Create a record for the STK Push request in the database
      await db.STKPushRequest.create({
        transactionId: transaction.id,
        // requestId: response.ConversationID,
        status: 'pending',
      });

      console.log("STK Push Request created and transaction status updated.");
    }

    return transaction;
  } catch (error) {
    console.error("Error in creating onramp transaction:", error);
    throw error;
  }
};

// Service to update the status of an existing onramp transaction
export const updateStatus = async (transactionId: string, status: 'initiated' | 'unprocessed' | 'completed') => {
  try {
    console.log(`Updating onramp transaction status: ID=${transactionId}, Status=${status}`);

    // Fetch the transaction by ID
    const transaction = await db.OnrampTransaction.findByPk(transactionId);

    // Check if the transaction exists
    if (!transaction) {
      throw new Error(`Transaction with ID=${transactionId} not found`);
    }

    // Update the status
    transaction.status = status;
    await transaction.save();

    console.log("Onramp transaction status updated:", transaction);
    return transaction;
  } catch (error) {
    console.error("Error updating onramp transaction status:", error);
    throw error;
  }
};
