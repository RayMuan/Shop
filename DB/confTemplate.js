var mysql = require('mysql'); 
// 보안을 위한 템플릿
var conn = mysql.createConnection({
    host: '',
    port: '',
    user: '',
    password: '',
    database: ''
});

conn.connect();

module.exports=conn
// database.js