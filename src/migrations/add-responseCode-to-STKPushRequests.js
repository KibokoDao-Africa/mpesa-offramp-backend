'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('STKPushRequests', 'responseCode', {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: 'Numeric response code indicating the transaction submission status',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('STKPushRequests', 'responseCode');
  },
};
