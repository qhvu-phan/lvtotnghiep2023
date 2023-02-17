'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    static associate(models) {
    }
  };
  cart.init({
    id: {
        autoIncrement: true,
        uniqueKeys: true,
        type: DataTransfer.INTEGER
      },
      visible_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      cart_user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cart_order_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cart_pro_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cart_pro_quantity: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1
      },
      is_Active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};