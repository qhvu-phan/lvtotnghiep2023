'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    static associate(models) {
    }
  };
  image.init({
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
      image_pro_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_name: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
      },
      image_path: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
      },
      image_size: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '400kb'
      },
      is_Active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};