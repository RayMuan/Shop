const express = require('express');
const router = express.Router();
const controller = require('./mainController');

/* GET home page. */
router.get('/', controller.main);

router.get('/product', controller.product);

module.exports = router;
