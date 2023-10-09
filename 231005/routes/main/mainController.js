var template = require('../../lib/template');
var conn = require('../../lib/database');
var url = require('url');
var path = require('path');
const { v4: uuidv4 } = require('uuid');

//메인 겸 상품리스트
exports.main = function(req, res) {
    // 접속 쿠키가 존재하지 않을 시 쿠키 생성, 임시 ordCode 부여
    var userCookie=req.cookies.userCookie;
    if(userCookie == null ){
        var tempCode=uuidv4();
        res.cookie('userCookie', {ordCode : tempCode},{maxAge: 60*60*24*30});
    }
     // 상품 리스트
    conn.query(`SELECT * FROM product`, function(err, result){
        console.log(result);
        var title = "Products List";
        var prodList = template.prodList(result);
        var html = template.HTML(title, `${prodList}`);
        res.end(html);
    });
}

//상품 상세
exports.product = function(req, res){
    var prodID = path.parse(req.params.prodID).base;
    var ordCode= req.cookies.userCookie.ordCode;
    
    conn.query(`SELECT * FROM product WHERE prodID=?`, [prodID], function(err, result){
        console.log(result);
        var title = "Product";
        var product = template.product(result, ordCode);
        var html = template.HTML(title, `${product}`);
        res.end(html);
    });
}


// 장바구니 페이지
exports.cart = function(req, res){
    // 비회원 쿠키 장바구니
    res.cookie('prodList', {cookieProd  : [['prodidtest','3'], ['test2','1']]});
    var title = "Cart Page";
    var cookieProd = req.cookies.prodList.cookieProd;
    console.log(cookieProd);
    var cookieProd_length = cookieProd.length;
    
    var sql = `SELECT * FROM PRODUCT WHERE prodID='${cookieProd[0][0]}'`;
    for(var i=1; i<cookieProd_length; i++){
        sql= sql+` or prodID='${cookieProd[i][0]}'`;
    }
    console.log(sql);
    conn.query(sql, function(err, result){
        // 장바구니 출력
        var cart = template.cart(result, cookieProd);
        var html = template.HTML(title, cart);
        //console.log(result);
        
        res.end(html);
    })
}

//결제 페이지
exports.payment = function(req, res){
    var ordCode= req.cookies.userCookie.ordCode;
    var title ="Payment";
    console.log(ordCode);
    var prodPrice = req.body.prodPrice;
    var ordNum=req.body.ordNum;

    var total=prodPrice*ordNum;
    console.log(total);
    var payment = template.payment(total, ordCode);
    var html = template.HTML(title, `${payment}`);
    
    res.end(html);
}