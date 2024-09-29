import axios from 'axios';

// Utility to obtain OAuth token for Safaricom Daraja API
const getOAuthToken = async () => {
  console.log("Requesting OAuth token");
  const { data: oauthData } = await axios.get(process.env.SAFARICOM_OAUTH_URL!, {
    auth: {
      username: process.env.SAFARICOM_CONSUMER_KEY!,
      password: process.env.SAFARICOM_CONSUMER_SECRET!,
    },
  });
  console.log("Received OAuth token:", oauthData.access_token);
  return oauthData.access_token;
};

// STK Push functionality
export const performSTKPush = async (phoneNumber: string, amount: number) => {
  console.log("Performing STK Push:", { phoneNumber, amount });
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
  
  console.log("STK Push response:", response);
  return response;
};

// B2C (Business to Customer) Payment
export const sendB2CPayment = async (mpesaNumber: string, amount: number) => {
  try {
    console.log("Sending B2C payment:", { mpesaNumber, amount });
    const token = await getOAuthToken();

    const { data: response } = await axios.post(
      process.env.SAFARICOM_B2C_URL!,
      {
        OriginatorConversationID: process.env.OriginatorConversationID,
        InitiatorName: process.env.SAFARICOM_INITIATOR_NAME!,
        SecurityCredential: process.env.SAFARICOM_SECURITY_CREDENTIAL!,
        CommandID: 'BusinessPayment',
        Amount: amount,
        PartyA: process.env.TESTNET_PARTY_A,
        PartyB: mpesaNumber,
        Remarks: 'B2C Payment',
        QueueTimeOutURL: `${process.env.CALLBACK_URL}/b2c-timeout`,
        ResultURL: `${process.env.CALLBACK_URL}/b2c-result`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log("B2C Payment response:", response);
    return response;
  } catch (error) {
    console.log("Error from B2C service:", error);
  }
};

// Buy Goods functionality
export const processBuyGoodsPayment = async (tillNumber: string, amount: number) => {
  console.log("Processing Buy Goods Payment:", { tillNumber, amount });
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
  
  console.log("Buy Goods Payment response:", response);
  return response;
};

// Paybill Payment
export const processPaybillPayment = async (paybillNumber: string, amount: number, accountNumber: string) => {
  console.log("Processing Paybill Payment:", { paybillNumber, amount, accountNumber });
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
  
  console.log("Paybill Payment response:", response);
  return response;
};
