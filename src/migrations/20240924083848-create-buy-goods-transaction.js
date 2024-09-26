'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BuyGoodsTransactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tillNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(18, 8),
        allowNull: false,
      },
      crypto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      noOfTokens: {
        type: Sequelize.DECIMAL(18, 8),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('initiated', 'unprocessed', 'completed'),
        defaultValue: 'initiated',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BuyGoodsTransactions');
  }
};
