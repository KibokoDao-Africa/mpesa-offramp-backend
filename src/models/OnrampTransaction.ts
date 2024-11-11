import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class OnrampTransaction extends Model {
  response(response: any) {
    throw new Error('Method not implemented.');
  }
  public id!: string;
  public phoneNumber!: string;
  public amount!: number;
  public crypto!: string;
  public noOfTokens!: number;
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
    get() {
      const value = this.getDataValue('amount');
      return value ? parseFloat(value) : 0;
    },
    set(value: number) {
      this.setDataValue('amount', value.toFixed(8)); // Store with precision
    }
  },
  crypto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noOfTokens: {
    type: DataTypes.DECIMAL(18, 8),
    allowNull: false,
    get() {
      const value = this.getDataValue('noOfTokens');
      return value ? parseFloat(value) : 0;
    },
    set(value: number) {
      this.setDataValue('noOfTokens', value.toFixed(8)); // Store with precision
    }
  },
  status: {
    type: DataTypes.ENUM('initiated', 'unprocessed', 'completed'),
    defaultValue: 'initiated',
    allowNull: false,
  },
}, { sequelize, modelName: 'OnrampTransaction' });


export default OnrampTransaction;
