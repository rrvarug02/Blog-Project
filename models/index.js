const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
const config = require('../config/config');

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];

const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
  host: configEnv.host,
  dialect: configEnv.dialect,
});

const db = {
  sequelize,
  Sequelize,
  User: require('./User')(sequelize, DataTypes),
  Post: require('./Post')(sequelize, DataTypes),
};

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

module.exports = db;