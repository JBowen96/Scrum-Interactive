const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'database-1.cyi0wfbnivj1.us-east-1.rds.amazonaws.com',
  username: 'admin',
  port: 3306,
  password: '1crappypassword',
  database: 'task_app1'
});

module.exports = sequelize;