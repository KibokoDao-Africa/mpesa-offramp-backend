import db from '../models';
import { performSTKPush } from '../utils/safaricom';
import { updateStatus } from './onrampService';

export const createSTKPushRequest = async (data: any) => {
  console.log("Creating STK Push Request with data:", data);
  
  const response = await performSTKPush(data.phoneNumber, data.amount);
  console.log("STK Push Response:", response);
  const stkPushRequest = ""

  // const stkPushRequest = await db.STKPushRequest.create({
  //   transactionId: data.transactionId,
  //   requestId: response.ConversationID,
  //   responseCode: response.ResponseCode,
  //   responseDescription: response.ResponseDescription,
  //   status: response.ResponseCode === '0' ? 'completed' : 'pending',
  // });
  // console.log("STK Push Request Created:", stkPushRequest);

  // if (response.ResponseCode === '0') {
  //   console.log(`Updating status for transaction ID ${data.transactionId} to 'unprocessed'`);
  //   await updateStatus(data.transactionId, 'unprocessed');
  // }

  return stkPushRequest;
};

export const getAllSTKPushRequests = async () => {
  console.log("Fetching all STK Push Requests");
  const stkPushRequests = await db.STKPushRequest.findAll();
  console.log("Fetched STK Push Requests:", stkPushRequests);
  return stkPushRequests;
};
