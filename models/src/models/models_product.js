'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
    }
  };
  product.init({
    id: {
        autoIncrement: true,
        uniqueKeys: true,
        type: DataTypes.INTEGER
      },
      visible_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      pro_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pro_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pro_nutritional: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
      },
      pro_price: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
      },
      pro_quantity: {
        type: DataTypes.STRING,
        defaultValue: 1
      },
      pro_description: {
        type: DataTypes.STRING,
        defaultValue: 'xuat xu viet nam'
      },
      is_Active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};