const { v4: uuidv4 } = require('uuid');
const mainDAO = require('../DB/mainDAO');

exports.ordCode_chk = function(userCookie){
    // 접속 쿠키가 존재하지 않을 시 쿠키 생성, 임시 ordCode 부여
    let ordCode;
    if(userCookie == null ){
        ordCode=uuidv4();
       return ordCode;
    }else{
        ordCode=userCookie.ordCode;
        return ordCode;
    }
}

exports.getProdList= async function(){
    // 상품 리스트
    var  prodList= await mainDAO.getProdList();
    return prodList;
}