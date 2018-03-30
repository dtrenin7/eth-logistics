'use strict';

var express = require('express');
var controller = require('./get_tx_result.controller');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;
