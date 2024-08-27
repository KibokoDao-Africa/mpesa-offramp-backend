import { DataTypes, Model, Sequelize } from 'sequelize';

class Paybill extends Model {
  public id!: string;
  public transactionId!: string;
  public requestId!: string;
  public responseCode!: string;
  public responseDescription!: string;
  public status!: 'pending' | 'completed';
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Paybill.init(
    {
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
        unique: true,
      },
      responseCode: {
        type: DataTypes.STRING,
      },
      responseDescription: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed'),
        defaultValue: 'pending',
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'PaybillRequests',
      timestamps: true,
    }
  );

  return Paybill;
};
