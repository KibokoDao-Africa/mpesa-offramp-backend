import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';  // Default import, not destructuring

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

export default OnrampTransaction;