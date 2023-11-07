const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config/database');
const cookieParser = require('cookie-parser');
const User = require('../models/user');

// Use cookie-parser middleware
router.use(cookieParser());

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        // Set a cookie for the newly signed up user
        res.cookie('userId', user.id, { maxAge: 60000, httpOnly: true }); // Adjust maxAge as needed

        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // Set a cookie to store the user's session information
                res.cookie('userId', user.id, { maxAge: 60000, httpOnly: true }); // Adjust maxAge as needed
                console.log('hello bug');
                return res.redirect('/dashboard');
            }
        }

        res.redirect('/login'); // Incorrect credentials
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
 