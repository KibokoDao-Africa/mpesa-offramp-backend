import { DataTypes, Model } from 'sequelize';
import sequelize  from '../config/database';

class OfframpTransaction extends Model {
  public id!: string;
  public mpesaNumber!: string;
  public amount!: number;
  public crypto!: string; // New field for cryptocurrency name
  public noOfTokens!: number; // New field for the number of tokens
  public status!: 'initiated' | 'unprocessed' | 'completed';
}

OfframpTransaction.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  mpesaNumber: {
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
}, { sequelize, modelName: 'OfframpTransaction' });

export default OfframpTransaction;
