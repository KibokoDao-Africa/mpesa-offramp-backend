import { DataTypes, Model, Sequelize } from 'sequelize';

class OfframpTransaction extends Model {
  public id!: string;
  public walletAddress!: string;
  public mpesaNumber!: string;
  public amount!: number;
  public status!: 'initiated' | 'unprocessed' | 'completed';
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  OfframpTransaction.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      walletAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mpesaNumber: {
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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize,
      tableName: 'OfframpTransactions',
      timestamps: true,
    }
  );

  return OfframpTransaction;
};
