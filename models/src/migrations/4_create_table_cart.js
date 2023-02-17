'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart', {
      id: {
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      visible_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      cart_user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cart_order_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cart_pro_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cart_pro_quantity: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('cart');
  }
};