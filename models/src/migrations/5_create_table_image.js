'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('image', {
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
      image_pro_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image_name: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false,
      },
      image_path: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false,
      },
      image_size: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '400kb'
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
    await queryInterface.dropTable('image');
  }
};