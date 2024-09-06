import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import OfframpTransaction from './OfframpTransaction';
import OfframpOnchainTransaction from './OfframpOnchainTransaction';
import OnrampTransaction from './OnrampTransaction';
import OnrampOnchainTransaction from './OnrampOnchainTransaction';
import STKPush from './stkPush';
import B2CRequest from './b2cRequest';
import Paybill from './paybill';
import BuyGoods from './BuyGoods';

const db: { [key: string]: any } = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.OfframpTransaction = OfframpTransaction(sequelize);
db.OfframpOnchainTransaction = OfframpOnchainTransaction(sequelize);
db.OnrampTransaction = OnrampTransaction(sequelize);
db.OnrampOnchainTransaction = OnrampOnchainTransaction(sequelize);
db.STKPush = STKPush(sequelize);
db.B2CRequest = B2CRequest(sequelize);
db.Paybill = Paybill(sequelize);
db.BuyGoods = BuyGoods(sequelize);

export default db;
