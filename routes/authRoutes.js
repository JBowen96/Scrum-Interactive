const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config/database');

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
console.log(req.body);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (result.length > 0) {
            const match = await bcrypt.compare(password, result[0].password);

            if (match) {
                req.session.userId = result[0].id;
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
