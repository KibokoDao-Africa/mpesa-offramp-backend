import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class OnrampOnchainTransaction extends Model {
  public id!: string;
  public transactionId!: string;
  public txHash!: string;
  public blockNumber!: number;
}

OnrampOnchainTransaction.init({
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
}, { sequelize, modelName: 'OnrampOnchainTransaction' });

export default OnrampOnchainTransaction;
