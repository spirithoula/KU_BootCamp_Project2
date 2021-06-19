const User = require('./User');
const Member = require('./Member');
const Event = require('./Event');
const Location = require('./Location');

User.hasMany(Member, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Member.belongsTo(User, {
  foreignKey: 'user_id'
});

Event.belongsTo(Location, {
  foreignKey: {
    allowNull: false
  }
})

Location.hasMany(Event, {
  onDelete: "CASCADE"
})

module.exports = { User, Member, Event, Location };
