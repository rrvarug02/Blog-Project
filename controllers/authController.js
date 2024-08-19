const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Render the login page
exports.loginPage = (req, res) => {
  res.render('auth/login');
};

// Render the registration page
exports.registerPage = (req, res) => {
  res.render('auth/register');
};

// Handle user registration
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

// Handle user login
exports.login = async (req, res) => {
};

// Handle user logout
exports.logout = (req, res) => {
  req.session.destroy();             // Destroy the user session
  res.redirect('/');                 // Redirect to the home page after logging out
};