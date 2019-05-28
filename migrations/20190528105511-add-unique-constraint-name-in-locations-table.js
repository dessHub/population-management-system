'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint(
      'locations',
      ['name'],
      {
        type: 'unique',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return
  }
};
