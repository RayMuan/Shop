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
        </head>
        <body>
            <div id="wrap">
                <h1>${title}</h1>
                ${body}
            </div>
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
    }, product: function(result){
        return `<div class="container">
            <h2>${result[0].prodName}</h2>
            <form action="/payment/${result[0].prodID}" method="post">
                <div>가격 : <input name="prodPrice" value="${result[0].prodPrice}" readonly/></div>
                <div>수량 <input name="ordNum" type="number"/></div>
                <div>
                    <button class="btn" type="button"><a href="/cartIn">담아두기<a></button>
                    <button class="btn" type="submit">주문하기</a></button>
                </div>
            </form>
        </div>`;
    }, payment: function(ordNum, prodID, prodPrice, total ){
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Patment Page</title>
            <link rel="stylesheet" href="../stylesheets/style.css">
            <script src="../javascripts/javascript.js"></script>
            <script src="https://js.tosspayments.com/v1/payment-widget"></script>
        </head>
        <body>
        <div id="wrap">
        <h1>Payment Page</h1>
        <div class="container">
            <div>    
                <h2>${prodID}</h2>
                <div>가격 : ${prodPrice} </div>
                <div>수량 ${ordNum}</div>
                <div>총액 : ${total}</div>
            </div>
            <div id="payment-method"></div>
            <div id="agreement"></div>
            <button id="payment-button">결제하기</button>
        </div>
        <script src="../javascripts/tossJS.js"></script>
        </body>
        </html>`;
        
    }
}