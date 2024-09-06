import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class PaybillOnchainTransaction extends Model {
  public id!: string;
  public transactionId!: string;
  public txHash!: string;
  public blockNumber!: number;
}

PaybillOnchainTransaction.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  transactionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  txHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blockNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { sequelize, modelName: 'PaybillOnchainTransaction' });

export default PaybillOnchainTransaction;
