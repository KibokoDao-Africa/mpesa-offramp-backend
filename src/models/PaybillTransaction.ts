import { DataTypes, Model } from 'sequelize';
import sequelize  from '../config/database';

class PaybillTransaction extends Model {
  public id!: string;
  public paybillNumber!: string;
  public accountNumber!: string;
  public amount!: number;
  public crypto!: string; // New field for cryptocurrency name
  public noOfTokens!: number; // New field for the number of tokens
  public status!: 'initiated' | 'unprocessed' | 'completed';
}

PaybillTransaction.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  paybillNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(18, 8),
    allowNull: false,
  },
  crypto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noOfTokens: {
    type: DataTypes.DECIMAL(18, 8),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('initiated', 'unprocessed', 'completed'),
    defaultValue: 'initiated',
    allowNull: false,
  },
}, { sequelize, modelName: 'PaybillTransaction' });

export default PaybillTransaction;
