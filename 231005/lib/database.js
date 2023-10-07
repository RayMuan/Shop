var mysql = require('mysql'); 
// 연결
var conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'test'
});

conn.connect();

module.exports=conn;
// database.js