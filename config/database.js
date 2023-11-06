const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'database-1.cyi0wfbnivj1.us-east-1.rds.amazonaws.com',
  user: 'admin',
  port: 3306,
  password: '1crappypassword',
});
  
module.exports = db;