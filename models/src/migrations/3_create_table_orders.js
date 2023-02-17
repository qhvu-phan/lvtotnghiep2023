'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      order_code: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      order_code_customer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_address: {
        type: Sequelize.STRING,
      },
      order_status: {
        type: Sequelize.ENUM('1','2','3','4'),
        allowNull: false,
        defaultValue: 1
      },
      is_Active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};