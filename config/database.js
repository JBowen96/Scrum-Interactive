const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'J ',
  password: '1CrappyPassword!',
  database: 'task_app',
});

try {
    db.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
  
  module.exports = db;
