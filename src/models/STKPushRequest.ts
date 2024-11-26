import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class STKPushRequest extends Model {
  public id!: string;
  public transactionId!: string;
  public responseCode!: number;
  public status!: 'pending' | 'completed';
}

STKPushRequest.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  transactionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  responseCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',
    allowNull: false,
  },
}, { sequelize, modelName: 'STKPushRequest' });

export default STKPushRequest;
