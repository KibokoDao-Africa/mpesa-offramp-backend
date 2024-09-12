import { DataTypes, Model } from 'sequelize';
import  sequelize  from '../config/database';

class B2CRequest extends Model {
  [x: string]: any;
  public id!: string;
  public transactionId!: string;
  public requestId!: string;
  public status!: 'pending' | 'completed';
}

B2CRequest.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  transactionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  requestId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',
    allowNull: false,
  },
}, { sequelize, modelName: 'B2CRequest' });

export default B2CRequest;
