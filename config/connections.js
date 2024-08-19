const { Sequelize } = require('sequelize'); // Import Sequelize 

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
      }
    );

// Export the Sequelize instance in order to use in other parts of the application
module.exports = sequelize;
