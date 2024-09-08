import OnrampTransaction from './OnrampTransaction';
import OnrampOnchainTransaction from './OnrampOnchainTransaction';
import OfframpTransaction from './OfframpTransaction';
import OfframpOnchainTransaction from './OfframpOnchainTransaction';
import BuyGoodsTransaction from './BuyGoodsTransaction';
import BuyGoodsOnchainTransaction from './BuyGoodsOnchainTransaction';
import PaybillTransaction from './PaybillTransaction';
import PaybillOnchainTransaction from './PaybillOnchainTransaction';
import STKPushRequest from './STKPushRequest';
import B2CRequest from './B2CRequest';

const db = {
  OnrampTransaction,
  OnrampOnchainTransaction,
  OfframpTransaction,
  OfframpOnchainTransaction,
  BuyGoodsTransaction,
  BuyGoodsOnchainTransaction,
  PaybillTransaction,
  PaybillOnchainTransaction,
  STKPushRequest,
  B2CRequest,
};

export default db;
