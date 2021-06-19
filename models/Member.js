const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Member extends Model {}

Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.INT,
    },
    weight: {
      type: DataTypes.INT,
    },
    profileImage: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = Member;
