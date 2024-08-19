const { User } = require('../models');

const seedDatabase = async () => {                    // Define an async function to seed the database
  await User.destroy({ where: {} });                  // Remove all existing users from the Users table

  const users = await User.bulkCreate([               // Create new users with specified usernames and passwords
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
