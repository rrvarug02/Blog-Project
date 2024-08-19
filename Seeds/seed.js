const { User } = require('../models');

const seedDatabase = async () => {
  await User.destroy({ where: {} }); 

  const users = await User.bulkCreate([
    {
      username: 'user1',
      password: 'password123',
    },
    {
      username: 'user2',
      password: 'password123',
    },
  ]);

  console.log('Database seeded successfully.');
  process.exit(0);
};

seedDatabase().catch(err => {
  console.error('Failed to seed database:', err);
  process.exit(1);
});
