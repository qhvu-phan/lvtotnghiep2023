'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    static associate(models) {
    }
  };
  orders.init({
    id: {
        autoIncrement: true,
        uniqueKeys: true,
        type: DataTypes.INTEGER
      },
      order_code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      order_code_customer: {
        type: DataTypes.VARCHAR,
        allowNull: false,
      },
      order_address: {
        type: DataTypes.STRING,
      },
      order_status: {
        type: DataTypes.ENUM('1','2','3','4'),
        allowNull: false,
        defaultValue: 1
      },
      is_Active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};