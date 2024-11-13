'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('STKPushRequests', 'requestId');
  },

  down: async (queryInterface, Sequelize) => {
    // In case you want to revert the migration, add the column back
    await queryInterface.addColumn('STKPushRequests', 'requestId', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
