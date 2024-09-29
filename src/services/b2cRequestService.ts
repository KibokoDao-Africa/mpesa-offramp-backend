import db from '../models';
import { sendB2CPayment } from '../utils/safaricom';
import { updateOfframpTransactionStatus } from './offrampService';

export const createB2CRequest = async (data: any) => {
  console.log("Received Service Request:", data);
  
  const response = await sendB2CPayment(data.mpesaNumber, data.amount);
  console.log("Received B2C Payment Response:", response);

  const b2cRequest = await db.B2CRequest.create({
    transactionId: data.transactionId,
    requestId: response.requestId,
    responseCode: response.responseCode,
    responseDescription: response.responseDescription,
    status: response.responseCode === '0' ? 'completed' : 'pending',
  });
  console.log("B2C Request Created:", b2cRequest);

  if (response.responseCode === '0') {
    console.log("Initiating Update of Offramp Transaction Status");
    await updateOfframpTransactionStatus(data.transactionId, 'completed');
    console.log("Offramp Transaction Status Updated to 'completed'");
  } else {
    console.log("B2C Payment Response Code not '0', skipping Offramp Transaction Status update");
  }

  return b2cRequest;
};

export const getAllB2CRequests = async () => {
  console.log("Fetching All B2C Requests");
  const b2cRequests = await db.B2CRequest.findAll();
  console.log("All B2C Requests Fetched:", b2cRequests);
  return b2cRequests;
};
