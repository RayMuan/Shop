var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/prodList', function(req, res, next) {
  res.render('prodList', { title: 'prod List' });
});

/* POST 결제 요청*/
// router.post('/reqpay', function( req, res, next) {
//  var payType = req.body.payType;
// var ordId = req.body.ordId;
// var amount = req.body.amount;
// var customerName = req.body.customerName;
// console.log("##post reqpay");
//});


module.exports = router;
