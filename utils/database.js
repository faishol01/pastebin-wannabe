const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'db',
  port: 3306,
  user: 'root',
  password: 'redacted',
  database: 'redacted'
})
connection.connect();
module.exports = connection;