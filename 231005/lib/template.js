module.exports = {
    HTML : function(title, body){
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <link rel="stylesheet" href="../stylesheets/style.css">
            <script src="../javascripts/javascripts.js"></script>
            <script src="https://js.tosspayments.com/v1/payment-widget"></script>
        </head>
        <body>
            <div id="wrap">
            <h1>${title}</h1>
            <div><button><a href="/cart">장바구니</a></button></div>
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
        return `<div class="container">
            <h2>${result[0].prodName}</h2>
            <form action="/payment/${ordCode}" method="post">
                <div>가격 : <input name="prodPrice" value="${result[0].prodPrice}" readonly/></div>
                <div>수량 : <input name="ordNum" type="number"/></div>
                <div>
                    <button class="btn" type="button"><a href="/cartIn">장바구니 담기<a></button>
                    <button class="btn" id="ordBtn" type="submit">주문하기</a></button>
                </div>
            </form>
        </div>`;
    }, cart : function(result, cookieProd){
        var prodItem = '<div class="container"><div class="prodItem"><div class="prodName">상품명</div><div class="prodPrice">가격</div><div class="ordNum">수량</div></div>';
        var total=0;
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
                <div class="ordNum">
                    ${cookieProd[i][1]}
                </div>
            </div>
            `;
            total=total+result[i].prodPrice*cookieProd[i][1];
        }
        prodItem = prodItem + 
        `<h2 id="total">결제 금액 : ${total}</h2>
            <div>
                <button class="btn" id="ordBtn" type="submit">주문하기</a></button>
            </div>
        </div>`;
        return prodItem;
    }, payment: function( total, ordCode){
        return `
        <h1>Payment Page</h1>
        <div class="container">
            <div>
                결제 금액 : <input id="total" type="number" value="${total}">
                <input id="ordCode" type="hidden" value="${ordCode}">
            </div>
            <div id="payment-method"></div>
            <div id="agreement"></div>
            <button id="payment-button">결제하기</button>
            </div>`;
    },
}