const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'J',
  port: 3306,
  password: '1crappypassword',
  database: 'task_app1'
});
  
module.exports = db;