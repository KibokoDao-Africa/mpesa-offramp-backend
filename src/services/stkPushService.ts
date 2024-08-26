import db from '../models';
import { performSTKPush } from '../utils/safaricom';

const createSTKPushRequest = async (data: any) => {
  const response = await performSTKPush(data.phoneNumber, data.amount);
  const stkPushRequest = await db.STKPush.create({
    transactionId: data.transactionId,
    requestId: response.ConversationID,
    responseCode: response.ResponseCode,
    responseDescription: response.ResponseDescription,
    status: response.ResponseCode === '0' ? 'completed' : 'pending',
  });

  return stkPushRequest;
};

const getAllSTKPushRequests = async () => {
  const stkPushRequests = await db.STKPush.findAll();
  return stkPushRequests;
};

export default { createSTKPushRequest, getAllSTKPushRequests };
