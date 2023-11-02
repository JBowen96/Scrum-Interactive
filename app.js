const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('./config/database');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Handlebars setup
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Authentication middleware
const noAuthRoute = ['login','signup']
const isAuthenticated = (req, res, next) => {
    if (noAuthRoute.includes(req.params.view)||req.session.userId) {
    return next();
  }
  res.redirect('/login');
};



// Routes
const authRoutes = require('./routes/authRoutes');
app.use( authRoutes);

// Redirect root path to the login page
app.get('/', (req, res) => {
  res.redirect('/login');
});

//routes for views
app.get('/:view', isAuthenticated, (req, res) => {
    // Render the stuff
    res.render(req.params.view);
  });

// Start the database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
