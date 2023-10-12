var ordCode = document.cookie.split(';')[1].split('=')[1];

// 홈
function moveHome(){
    location.href=`/`;
}

// 주문하기 (결제 창 이동)버튼
function movePayment(){
    var ordForm = document.getElementById('ordForm');
    ordForm.setAttribute('method', 'post');
    ordForm.setAttribute('action', `/payment/${ordCode}`);

    ordForm.submit();
}

// 장바구니 이동 버튼
function moveCart(){
    location.href=`/cart/${ordCode}`;
}

function cartOut(){
    location.href=`/cartOut`;
}

//장바구니 담기
function cartIn(){
    var ordForm = document.getElementById('ordForm');
    ordForm.setAttribute('method', 'post');
    ordForm.setAttribute('action', `/cartIn`);

    ordForm.submit();
}

function totalSum(){
    var ordNum=document.getElementById('ordNum').value;
    var prodPrice = document.getElementById('prodPrice').value;
    
    var total = document.getElementById('total');
    total.setAttribute('value', `${ordNum * prodPrice}`);
    
}