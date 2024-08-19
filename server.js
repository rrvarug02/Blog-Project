const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3004;
const { SESSION_SECRET = 'supersecret' } = process.env;

const app = express();

const hbs = exphbs.create(); 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use('/', require('./routes/postRoutes'));
app.use('/auth', require('./routes/authRoutes'));

// Error handling
app.use((req, res, next) => {
  res.status(404).render('404', { layout: false });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { layout: false });
});

// Start server and sync database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});