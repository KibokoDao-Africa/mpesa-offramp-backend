import { DataTypes, Model, Sequelize } from 'sequelize';

class OfframpOnchainTransaction extends Model {
  public id!: string;
  public transactionId!: string;
  public txHash!: string;
  public blockNumber!: number;
  public status!: 'unprocessed' | 'processed';
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  OfframpOnchainTransaction.init(
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
      txHash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      blockNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('unprocessed', 'processed'),
        defaultValue: 'unprocessed',
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
      tableName: 'OfframpOnchainTransactions',
      timestamps: true,
    }
  );

  return OfframpOnchainTransaction;
};
