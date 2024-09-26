'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('B2CRequests', {
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
      requestId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed'),
        defaultValue: 'pending',
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
    await queryInterface.dropTable('B2CRequests');
  }
};
