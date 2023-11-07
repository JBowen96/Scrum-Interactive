const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'J',
  port: 3306,
  password: '1crappypassword',
  database: 'task_app1'
});

module.exports = sequelize;