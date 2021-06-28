const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model {}

Location.init(
  {
    name: {
        type: DataTypes.STRING,
    },
    lat: {
        type: DataTypes.DECIMAL(10, 7),
    },
    lon: {
      type: DataTypes.DECIMAL(10, 7),
  },
    date: {
    type: DataTypes.DATEONLY,
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'location',
  }
);

module.exports = Location;
