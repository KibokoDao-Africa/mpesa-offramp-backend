import db from '../models';
import { performSTKPush } from '../utils/safaricom';
import { updateStatus } from './onrampService';

interface STKPushRequestData {
  phoneNumber: string;
  amount: number;
  transactionId: string;
}

// Service to create an STK Push request
export const createSTKPushRequest = async (data: STKPushRequestData) => {
  try {
    console.log("Creating STK Push Request with data:", data);

    // Perform the STK Push request
    const response = await performSTKPush(data.phoneNumber, data.amount);
    console.log("STK Push Response:", response);

    // Create an STK Push request record in the database
    const stkPushRequest = await db.STKPushRequest.create({
      transactionId: data.transactionId,
      requestId: response.ConversationID,
      status: response.ResponseCode === '0' ? 'completed' : 'pending',
    });

    console.log("STK Push Request Created:", stkPushRequest);

    // Update the status of the associated transaction
    if (response.ResponseCode === '0') {
      await updateStatus(data.transactionId, 'unprocessed');
    }

    return stkPushRequest;
  } catch (error) {
    console.error("Error creating STK Push request:", error);
    throw error;
  }
};

// Service to get all STK Push requests
export const getAllSTKPushRequests = async () => {
  try {
    console.log("Fetching all STK Push Requests");
    const stkPushRequests = await db.STKPushRequest.findAll();
    console.log("Fetched STK Push Requests:", stkPushRequests);
    return stkPushRequests;
  } catch (error) {
    console.error("Error fetching STK Push Requests:", error);
    throw error;
  }
};
