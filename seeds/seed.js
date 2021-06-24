const sequelize = require('../config/connection');
const { User, Member, Event } = require('../models');

const userData = require('./userData.json');
const memberData = require('./memberData.json');
const eventData = require('./eventData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Event.bulkCreate(eventData);

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const member of memberData) {
    await Member.create({
      ...member,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
