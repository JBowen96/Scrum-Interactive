const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config/database');
const cookieParser = require('cookie-parser');

// Use cookie-parser middleware
router.use(cookieParser());

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

        // Set a cookie for the newly signed up user
        res.cookie('userId', result.insertId, { maxAge: 60000, httpOnly: true }); // Adjust maxAge as needed

        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;  

    try {
        const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);  

        if (result.length > 0) {
            const match = await bcrypt.compare(password, result[0].password);

            if (match) {
                // Set a cookie to store the user's session information
                res.cookie('userId', result[0].id, { maxAge: 60000, httpOnly: true }); // Adjust maxAge as needed
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
