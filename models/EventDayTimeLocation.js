const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class EventDayTimeLocation extends Model {}

EventDayTimeLocation.init(
  {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false

    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'eventdaytimelocation',
  }
);

module.exports = EventDayTimeLocation;
