const conn = require('./conf');

// 상품 리스트
exports.getProdList = function(){
    conn.query(`SELECT * FROM product`, function(err, result){
        result = this.result;
        console.log('DAO : '+result);
        console.log('에러 : '+err);
    });
}