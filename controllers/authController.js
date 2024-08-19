const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.loginPage = (req, res) => {
  res.render('auth/login');
};

exports.registerPage = (req, res) => {
  res.render('auth/register');
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.redirect('/auth/login');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  // Authentication logic
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};