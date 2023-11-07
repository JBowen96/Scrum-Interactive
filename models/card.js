// models/card.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Card = sequelize.define('Card', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('to-do', 'in-work', 'completed'), // Add the possible columns
        allowNull: false,
    },
});

module.exports = Card;
