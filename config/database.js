const { Sequelize } = require('sequelize');
require('dotenv').config()

const HOST = process.env.HOST;
const MASTERNAME = process.env.MASTERNAME;
const DBPORT = process.env.DBPORT;
const DBPASS = process.env.DBPASS;
const DBNAME = process.env.DBNAME;

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: HOST,
  username: MASTERNAME,
  port: DBPORT,
  password: DBPASS,
  database: DBNAME,
});

module.exports = sequelize;