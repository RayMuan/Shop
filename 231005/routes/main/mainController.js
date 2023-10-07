const template = require('../../lib/template');
var conn = require('../../lib/database');
var url = require('url');

exports.main = function(req, res) {
    conn.query(`SELECT * FROM product`, function(err, result){
        var title = "Products List";
        var prodList = template.prodList(result);
        var html = template.HTML(title, `${prodList}`);
        res.end(html);
    });
}

exports.product = function(req, res){
    var queryData = url.parse(req.url, true).query;
    console.log(queryData);
    conn.query(`SELECT * FROM product WHERE prodID=?`, [queryData.prodID], function(err, result){
        console.log(result);
        var title="Product";
        var product = template.product(result);
        var html = template.HTML(title, `${product}`);
        res.end(html);
    });
}