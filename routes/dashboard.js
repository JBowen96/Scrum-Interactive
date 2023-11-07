// routes/dashboard.js
const express = require('express');
const router = express.Router();
const Card = require('../models/card.js');

router.get('/', async (req, res) => {
    try {
        const cards = await Card.findAll();
        console.log(cards);
        const cardData = cards.map(card => card.get({ plain: true }));
        res.render('dashboard', { cards: cardData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/create-card', async (req, res) => {
    try {
        console.log('Received request to create card:', req.body);
        // const { title, description, status } = req.body;
        const createdCard = await Card.create(req.body);
        res.status(200).json(createdCard);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/move-card/:id/:column', async (req, res) => {
    try {
        const { id, column } = req.params;
        console.log('requested move to:', column)
        await Card.update({ status: column }, { where: { id } });
        const updatedCard = await Card.findOne({ where: { id } });
        const cardData = updatedCard.get({ plain: true });

        console.log(cardData);
        res.status(200).json(cardData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/delete-card/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCard = await Card.findByPk(id);

        if (!deletedCard) {
            res.status(404).json({ error: 'Card not found' });
            return;
        }

        await Card.destroy({
            where: {
                id
            }
        });

        res.status(200).json(deletedCard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/logout', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Redirect the user to the login page after logout
            res.redirect('/login');
        }
    });
});

module.exports = router;      