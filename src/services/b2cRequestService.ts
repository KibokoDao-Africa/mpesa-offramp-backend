import db from '../models';
import { sendB2CPayment } from '../utils/safaricom';
import offrampService from './offrampService';

const createB2CRequest = async (data: any) => {
  const response = await sendB2CPayment(data.mpesaNumber, data.amount);
  
  const b2cRequest = await db.B2CRequest.create({
    transactionId: data.transactionId,
    requestId: response.requestId,
    responseCode: response.responseCode,
    responseDescription: response.responseDescription,
    status: response.responseCode === '0' ? 'completed' : 'pending',
  });

  if (response.responseCode === '0') {
    await offrampService.updateOfframpTransactionStatus(data.transactionId, 'completed');
  }

  return b2cRequest;
};

const getAllB2CRequests = async () => {
  const b2cRequests = await db.B2CRequest.findAll();
  return b2cRequests;
};

export default { createB2CRequest, getAllB2CRequests };
