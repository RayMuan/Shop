module.exports = {
    HTML : function(title, body){
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <link rel="stylesheet" href="stylesheets/style.css">
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
                    <a href="/product/?prodID=${result[i].prodID}">
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
            <h2>${result.prodName}</h2>
            <form>
                <div>가격 : ${result.prodPrice}</div>
                <div>수량 <input type="number"/></div>
                <div><button id="">주문하기</button></div>
                <div><button id="basketBtn">장바구니</button></div>
            </form>
        </div>`;
    }
}