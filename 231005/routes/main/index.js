const express = require('express');
const router = express.Router();
const controller = require('./mainController');

/* GET home page. */
router.get('/', controller.main);

router.get('/product/:prodID', controller.product);

router.get('/cart/:ordCode', controller.cart);

router.get('/cartOut/:delNum', controller.cartOut);

router.post('/cartIn', controller.cartIn);


router.get('/payResult/:result', controller.payResult);

router.post('/payment/:ordCode', controller.payment);

module.exports = router;
