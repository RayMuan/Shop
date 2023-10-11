module.exports = {
    HTML : function(title, body){
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <link rel="stylesheet" href="../stylesheets/style.css">
            <script src="../javascripts/javascript.js"></script>
            <script src="https://js.tosspayments.com/v1/payment-widget"></script>
        </head>
        <body>
            <div id="wrap">
            <h1>${title}</h1>
            <div>
                <button class="Btn" type="button" onclick="moveHome()">홈</button>
                <button class="Btn" type="button" onclick="moveCart()">장바구니</button>
            </div>
            ${body}
            </div>
            <script src="../javascripts/tossJS.js"></script>
        </body>
        </html>`;
    }, prodList: function(result){
        var prodItem = '<div class="container"><div class="prodItem"><div class="prodName">상품명</div><div class="prodPrice">가격</div></div>';
        for(var i=0; i < result.length; i++){
            prodItem =  prodItem + `
            <div class="prodItem">
                <div class="prodName">
                    <a href="/product/${result[i].prodID}">
                    ${result[i].prodName}
                    </a>
                </div>
                <div class="prodPrice">
                    ${result[i].prodPrice}
                </div>
            </div>
            `;
        }
        prodItem = prodItem + '</div>';
        return prodItem;
    }, product: function(result, ordCode){
        var total=`${result[0].prodPrice}`;
        return `<div class="container">
        <form id="ordForm">
                <input name="prodID" type="hidden" value="${result[0].prodID}"/>
                <div>상품이름 : <input name="prodName" value=" ${result[0].prodName}" readonly/></div>
                <div>가격 : <input name="prodPrice" id="prodPrice" value="${result[0].prodPrice}" readonly/></div>
                <div>수량 : <input name="ordNum" id="ordNum" onchange="totalSum()" type="number"/></div>
                <div><h2>결제 금액 : <input type="number" id="total" name="total" value=""/></h2></div>
                <div>
                    <button class="btn" id="cartInBtn" type="button" onclick="cartIn()" >장바구니 담기</button>
                    <button class="btn" id="payBtn" type="button" onclick="movePayment()">주문하기</a></button>
                </div>
            </form>
        </div>`;
    }, cart : function(prodCookie){
        var prodItem = '<div class="container"><div class="prodItem"><div class="prodName">상품명</div><div class="prodPrice">가격</div><div class="ordNum">수량</div></div>';
        var total=0;
        for(var i=0; i < prodCookie.length; i++){
            prodItem =  prodItem + `
            <div class="prodItem">
            <div class="prodName">
            <a href="/product/${prodCookie[i].prodID}">
            ${prodCookie[i].prodName}
            </a>
            </div>
            <div class="prodPrice">
            ${prodCookie[i].prodPrice}
            </div>
            <div class="ordNum">
            ${prodCookie[i].ordNum}
            </div>
            <div class="cartOut">
                <input type="hidden" value=${i} id="cartOut">
                <button type="button" onclick="cartOut()">삭제</button>
            </div>
            </div>
            `;
            total=total+prodCookie[i].prodPrice*prodCookie[i].ordNum;
        }
        prodItem = prodItem + 
        `<form id="ordForm">
            <h2>결제 금액 : <input type="number" name="total" value="${total}"/></h2>
            <div>
                <button class="btn" id="payBtn" onclick="movePayment()">주문하기</a></button>
            </div>
        </form>
        </div>`;
        return prodItem;
    }, payment: function(total, ordCode){
        return `
        <h1>Payment Page</h1>
        <div class="container">
            <div>
                주문 코드 : <input id="ordCode" name="ordCode" value="${ordCode}">
            </div>
            <div>
                결제 금액 : <input id="total" name="total" type="number" value="${total}">
            </div>
            <div id="payment-method"></div>
            <div id="agreement"></div>
            <button id="payment-button">결제하기</button>
            </div>`;
    },
}