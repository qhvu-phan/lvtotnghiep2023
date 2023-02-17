'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product', {
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
      pro_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pro_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pro_nutritional: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pro_price: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pro_quantity: {
        type: Sequelize.STRING,
        defaultValue: 1
      },
      pro_description: {
        type: Sequelize.STRING,
        defaultValue: 'xuat xu viet nam'
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
    await queryInterface.dropTable('product');
  }
};