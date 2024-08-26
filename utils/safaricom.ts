import axios from 'axios';

// Utility to obtain OAuth token for Safaricom Daraja API
const getOAuthToken = async () => {
  const { data: oauthData } = await axios.get(process.env.SAFARICOM_OAUTH_URL!, {
    auth: {
      username: process.env.SAFARICOM_CONSUMER_KEY!,
      password: process.env.SAFARICOM_CONSUMER_SECRET!,
    },
  });

  return oauthData.access_token;
};

// STK Push functionality
export const performSTKPush = async (phoneNumber: string, amount: number) => {
  const token = await getOAuthToken();

  const { data: response } = await axios.post(
    process.env.SAFARICOM_STK_PUSH_URL!,
    {
      BusinessShortCode: process.env.SAFARICOM_SHORT_CODE!,
      Password: process.env.SAFARICOM_PASSWORD!,
      Timestamp: new Date().toISOString(),
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: process.env.SAFARICOM_SHORT_CODE!,
      PhoneNumber: phoneNumber,
      CallBackURL: `${process.env.CALLBACK_URL}/stk-push-callback`,
      AccountReference: 'Onramp',
      TransactionDesc: 'Onramp Payment',
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

// Buy Goods functionality
export const performBuyGoodsTransaction = async (tillNumber: string, amount: number) => {
  const token = await getOAuthToken();

  const { data: response } = await axios.post(
    process.env.SAFARICOM_BUY_GOODS_URL!,
    {
      CommandID: 'CustomerBuyGoodsOnline',
      Amount: amount,
      PartyA: tillNumber,
      PartyB: process.env.SAFARICOM_TILL_NUMBER!,
      Remarks: 'Buy Goods Payment',
      QueueTimeOutURL: `${process.env.CALLBACK_URL}/buy-goods-timeout`,
      ResultURL: `${process.env.CALLBACK_URL}/buy-goods-result`,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

// Till Number Payment
export const performTillNumberPayment = async (tillNumber: string, amount: number) => {
  const token = await getOAuthToken();

  const { data: response } = await axios.post(
    process.env.SAFARICOM_TILL_PAYMENT_URL!,
    {
      CommandID: 'CustomerBuyGoodsOnline',
      Amount: amount,
      PartyA: tillNumber,
      PartyB: process.env.SAFARICOM_TILL_NUMBER!,
      Remarks: 'Till Number Payment',
      QueueTimeOutURL: `${process.env.CALLBACK_URL}/till-number-timeout`,
      ResultURL: `${process.env.CALLBACK_URL}/till-number-result`,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

// Paybill Payment
export const performPaybillPayment = async (paybillNumber: string, amount: number, accountNumber: string) => {
  const token = await getOAuthToken();

  const { data: response } = await axios.post(
    process.env.SAFARICOM_PAYBILL_URL!,
    {
      CommandID: 'BusinessPayment',
      Amount: amount,
      PartyA: paybillNumber,
      PartyB: accountNumber,
      Remarks: 'Paybill Payment',
      QueueTimeOutURL: `${process.env.CALLBACK_URL}/paybill-timeout`,
      ResultURL: `${process.env.CALLBACK_URL}/paybill-result`,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
