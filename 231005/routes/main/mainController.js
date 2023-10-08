var template = require('../../lib/template');
var conn = require('../../lib/database');
var url = require('url');
var path = require('path');
const { v4: uuidv4 } = require('uuid');

//메인 겸 상품리스트
exports.main = function(req, res) {
    conn.query(`SELECT * FROM product`, function(err, result){
        var userID=uuidv4();
        console.log(userID);
        // 비회원 userID=> list에 접속시 생성 후 쿠키 저장

        var title = "Products List";
        var prodList = template.prodList(result);
        var html = template.HTML(title, `${prodList}`);
        res.end(html);
    });
}
//상품 상세
exports.product = function(req, res){
    var filteredID = path.parse(req.params.prodID).base;
    console.log(filteredID);
    conn.query(`SELECT * FROM product WHERE prodID=?`, [filteredID], function(err, result){
        console.log(result);
        var title = "Product";
        var product = template.product(result);
        var html = template.HTML(title, `${product}`);
        res.end(html);
    });
}

//주문 페이지 
exports.payment = function(req, res){
    var prodID = path.parse(req.params.prodID).base;
    var ordNum = req.body.ordNum;
    var prodPrice = req.body.prodPrice;
    var total = prodPrice * ordNum;
    console.log(total);

    var payment = template.payment(ordNum, prodID, prodPrice, total);
    
    res.end(payment);
}