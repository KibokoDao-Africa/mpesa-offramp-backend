import db from '../models';
import { performPaybillPayment } from '../utils/safaricom';

const createPaybillRequest = async (data: any) => {
  const response = await performPaybillPayment(data.paybillNumber, data.amount, data.accountNumber);
  const paybillRequest = await db.Paybill.create({
    transactionId: data.transactionId,
    requestId: response.ConversationID,
    responseCode: response.ResponseCode,
    responseDescription: response.ResponseDescription,
    status: response.ResponseCode === '0' ? 'completed' : 'pending',
  });

  return paybillRequest;
};

const getAllPaybillRequests = async () => {
  const paybillRequests = await db.Paybill.findAll();
  return paybillRequests;
};

export default { createPaybillRequest, getAllPaybillRequests };
