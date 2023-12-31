const template = require('../../lib/template');
const conn = require('../../DB/conf');
const url = require('url');
const path = require('path');
const service = require('../../services/mainService');

//메인 겸 상품리스트
exports.main = async function(req, res) {
    // 쿠키 확인
    let userCookie=req.cookies.userCookie;
    ordCode = await service.ordCode_chk(userCookie);
    res.cookie('userCookie', {ordCode:ordCode},{maxAge: 60*60*24*30});

     // 상품 리스트
    conn.query(`SELECT * FROM product`, function(err, result){
        console.log(result);
        var title = "HOME-Products List";
        var prodList = template.prodList(result);
        var html = template.HTML(title, `${prodList}`);
        res.send(html);
    });
}

//상품 상세
exports.product = function(req, res){
    var prodID = path.parse(req.params.prodID).base;
    var ordCode = req.cookies.userCookie.ordCode;

    conn.query(`SELECT * FROM product WHERE prodID=?`, [prodID], function(err, result){
        console.log(result);
        var title = "Product";
        var product = template.product(result, ordCode);
        var html = template.HTML(title, `${product}`);
        res.send(html);
    });
}


// 장바구니 페이지
exports.cart = function(req, res){
    try{
        // 비회원 쿠키 장바구니
        var title = "Cart Page";
        var prodCookie = req.cookies.prodCookie;
    
        console.log(prodCookie);
        console.log(prodCookie.length);
        try{
            // 장바구니 출력
            var cart = template.cart(prodCookie);
            var html = template.HTML(title, cart);
            res.send(html);
    
        }catch{
            result=null;
            var cart = template.cart(result, prodCookie);
            var html = template.HTML(title, cart);
    
            res.send(html);
        }

    }catch{
        var html = template.HTML(title, `<div>장바구니가 비어있습니다.</div>`);
    
        res.send(html);
    }
}

// 장바구니 삭제
exports.cartOut = function(req, res){
    var prodCookie = req.cookies.prodCookie;
    var ordCode = req.cookies.userCookie.ordCode;
    console.log(prodCookie);
    res.clearCookie('prodCookie');
    console.log(prodCookie);
    res.send(`<script type="text/javascript">location.href='/cart/${ordCode}';</script>`);
}

// 장바구니 담기
exports.cartIn = function(req, res){
    var prodID = req.body.prodID;
    var prodName = req.body.prodName;
    var prodPrice = req.body.prodPrice;
    var ordNum = req.body.ordNum;
    var prodCookie = req.cookies.prodCookie;
    
    if(prodCookie == null){
        res.cookie(`prodCookie`, [{prodID:prodID, prodName:prodName, prodPrice:prodPrice ,ordNum:ordNum}] ,{maxAge: 60*60*24*30});
    }else{
        let arr=[];
        for(var i=0; i<prodCookie.length; i++){
            arr[i]=(prodCookie[i]);

            console.log('쿠키 값 :'+(arr));
        }
        arr [prodCookie.length] = {prodID:prodID, prodName:prodName, prodPrice:prodPrice,ordNum:ordNum};
        res.cookie(`prodCookie`, arr ,{maxAge: 60*60*24*30});
    }
    res.send(`<script type="text/javascript">alert("장바구니에 추가되었습니다."); window.location="/"; </script>`);
}

//결제 페이지
exports.payment = function(req, res){
    var title ="Payment";
    var ordCode= req.cookies.userCookie.ordCode;

    var total=req.body.total;
    var payment = template.payment(total, ordCode);
    var html = template.HTML(title, `${payment}`);
    
    res.send(html);
}

//결제 결과
exports.payResult = function(req, res){
    var result = path.parse(req.params.result).base;
    var title = "Payment Result";
    if(result=="success"){
        var html = template.HTML(title, `<div class="container"><h2>결제에 성공하였습니다.</h2></div>`);
        res.send(html);
    }else if(result=="fail"){
        var html = template.HTML(title, `<div class="container"><h2>결제에 실패하였습니다.</h2></div>`);
        res.send(html);
    }
}