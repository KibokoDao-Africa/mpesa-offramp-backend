import { DataTypes, Model, Sequelize } from 'sequelize';

class OnrampTransaction extends Model {
  public id!: string;
  public phoneNumber!: string;
  public walletAddress!: string;
  public amount!: number;
  public status!: 'initiated' | 'unprocessed' | 'completed';
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  OnrampTransaction.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      walletAddress: {
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
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'OnrampTransactions',
      timestamps: true,
    }
  );

  return OnrampTransaction;
};
