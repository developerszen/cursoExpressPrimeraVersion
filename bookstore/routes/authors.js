var express = require('express');
var router = express.Router();

const authorController = require('../controllers/authorController');
const authController = require('../controllers/authController');

router.all('*', authController.verifyToken)
router.get('/', authorController.index);
router.post('/', authorController.store);
router.get('/:id', authorController.show);
router.put('/:id', authorController.update);
router.delete('/:id', authorController.delete);

module.exports = router