const express = require('express');
const router = express.Router();

const main = require('../controllers/main');


router.use('/', main);


module.exports = router;