import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';  // Default import of sequelize instance

// OnrampTransaction Model
class OnrampTransaction extends Model {
  public id!: string;
  public phoneNumber!: string;
  public amount!: number;
  public status!: 'initiated' | 'unprocessed' | 'completed';
}

OnrampTransaction.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(18, 8),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('initiated', 'unprocessed', 'completed'),
    defaultValue: 'initiated',
    allowNull: false,
  },
}, { sequelize, modelName: 'OnrampTransaction' });

// PaybillTransaction Model
class PaybillTransaction extends Model {
  public id!: string;
  public paybillNumber!: string;
  public accountNumber!: string;
  public amount!: number;
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
  status: {
    type: DataTypes.ENUM('initiated', 'unprocessed', 'completed'),
    defaultValue: 'initiated',
    allowNull: false,
  },
}, { sequelize, modelName: 'PaybillTransaction' });

export { OnrampTransaction, PaybillTransaction };
