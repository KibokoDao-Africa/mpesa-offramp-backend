'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OfframpOnchainTransactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      transactionId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      txHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blockNumber: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('OfframpOnchainTransactions');
  }
};
