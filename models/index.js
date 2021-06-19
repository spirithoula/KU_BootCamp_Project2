const User = require('./User');
const Member = require('./Member');

User.hasMany(Member, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Member.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Member };
