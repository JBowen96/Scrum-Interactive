const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const dashboardRoutes = require('./routes/dashboard');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Session setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 } // Adjust maxAge as needed
}));

// Handlebars setup
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Authentication middleware
const noAuthRoute = ['login', 'signup', 'dashboard'];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const isAuthenticated = (req, res, next) => {
    const userIdFromSession = req.session.userId;
    const userIdFromCookie = req.cookies.userId;

    // Allow access to dashboard route and specified routes
    if (req.params.view === 'dashboard' || noAuthRoute.includes(req.params.view) || userIdFromSession || userIdFromCookie) {
        return next();
    }

    res.redirect('/login');
};

// Routes
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);
app.use('/dashboard', dashboardRoutes);

// Redirect root path to the login page
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Routes for views
app.get('/:view', isAuthenticated, (req, res) => {
    // Render the requested view
    res.render(req.params.view);
});

// Start the database connection

// sequelize.authenticate()
//     .then(() => {
//         console.log('Connected to the database');
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error('Error connecting to the database:', err);
//     });

// Server start 
app.listen(PORT, () => {
    console.log('Connected to the database');
    console.log(`Server is running on http://localhost:${PORT}`);
    sequelize.sync({force:false});
});

