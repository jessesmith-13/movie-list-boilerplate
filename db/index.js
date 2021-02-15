const mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'movies'
})

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('CONNECTED!!!!!!!!!!!!!!!!!!!!!');
})

module.exports = connection;