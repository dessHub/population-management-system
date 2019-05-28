'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      males: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      females: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      parentLocation: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'locations',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('locations');
  }
};
