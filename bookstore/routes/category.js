var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.index);
router.post('/', categoryController.store);
router.get('/:id', categoryController.show);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router