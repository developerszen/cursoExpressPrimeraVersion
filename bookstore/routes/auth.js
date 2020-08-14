var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');

router.post('/authenticate', authController.authenticate);

module.exports = router;
