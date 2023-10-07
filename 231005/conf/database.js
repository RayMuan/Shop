const mysql = require('mysql'); 

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'test'
});

connection.connect();

connection.query('SELECT * from product', function(err, rows, fields){
    if (err) {
        console.log(err);
    }
    console.log(rows);
  });

  connection.end();
// database.js