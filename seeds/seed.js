const sequelize = require('../config/connection');
const { User, Member, Location } = require('../models');

const userData = require('./userData.json');
const memberData = require('./memberData.json');
const locationData = require('./eventData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Location.bulkCreate(locationData);

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
