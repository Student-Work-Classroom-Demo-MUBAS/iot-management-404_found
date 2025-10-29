const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: "root",  
  password: "NewStrongPassword123!",   
  database: 'smartHomeDB',
});

module.exports = pool;
