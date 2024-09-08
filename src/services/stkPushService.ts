import db from '../models';
import { performSTKPush } from '../utils/safaricom';
import onrampService from './onrampService';

const createSTKPushRequest = async (data: any) => {
  const response = await performSTKPush(data.phoneNumber, data.amount);

  const stkPushRequest = await db.STKPushRequest.create({
    transactionId: data.transactionId,
    requestId: response.ConversationID,
    responseCode: response.ResponseCode,
    responseDescription: response.ResponseDescription,
    status: response.ResponseCode === '0' ? 'completed' : 'pending',
  });

  if (response.ResponseCode === '0') {
    await onrampService.updateStatus(data.transactionId, 'unprocessed');
  }

  return stkPushRequest;
};

const getAllSTKPushRequests = async () => {
  const stkPushRequests = await db.STKPushRequest.findAll();
  return stkPushRequests;
};

export default { createSTKPushRequest, getAllSTKPushRequests };
