import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class STKPushRequest extends Model {
  public id!: string;
  public transactionId!: string;
  // public requestId!: string;
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
  // requestId: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',
    allowNull: false,
  },
}, { sequelize, modelName: 'STKPushRequest' });

export default STKPushRequest;
