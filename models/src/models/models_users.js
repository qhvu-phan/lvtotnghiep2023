'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
    }
  };
  users.init({
    id: {
      type: DataTypes.INTEGER,
      auto_increment: true,
      uniqueKeys: true
    },
    visible_id:{
      type: DataTypes.VARCHAR,
      primaryKey: true,
      allowNull: false,
    } ,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwords: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      uniqueKeys: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      uniqueKeys: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    is_Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};