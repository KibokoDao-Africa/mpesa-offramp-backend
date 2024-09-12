import db from '../models';
import { sendB2CPayment } from '../utils/safaricom';
import offrampService from './offrampService';

const createB2CRequest = async (data: any) => {
  console.log("Service Request");
  
  const response = await sendB2CPayment(data.mpesaNumber, data.amount);
  console.log(data.mpesaNumber, data.amount);

  const b2cRequest = await db.B2CRequest.create({
    transactionId: data.transactionId,
    requestId: response.requestId,
    responseCode: response.responseCode,
    responseDescription: response.responseDescription,
    status: response.responseCode === '0' ? 'completed' : 'pending',
  });

  if (response.responseCode === '0') {
    console.log("b2c doing")
    await offrampService.updateOfframpTransactionStatus(data.transactionId, 'completed');
   
  }

  return b2cRequest;
};

const getAllB2CRequests = async () => {
  const b2cRequests = await db.B2CRequest.findAll();
  return b2cRequests;
};

export default { createB2CRequest, getAllB2CRequests };
