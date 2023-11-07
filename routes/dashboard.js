// routes/dashboard.js
const express = require('express');
const router = express.Router();
const Card = require('../models/card.js');

router.get('/dashboard', async (req, res) => {
    try {
        const cards = await Card.findAll();
        res.render('dashboard', { cards });
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
        await Card.update({ status:column }, { where: { id }});
        const updatedCard = await Card.findOne({ where: { id }});
        const cardData = updatedCard.get({plain: true});

        console.log(cardData);
        res.status(200).json(cardData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;     