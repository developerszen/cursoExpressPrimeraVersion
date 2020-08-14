var express = require('express');
var router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/search', bookController.buscar);
router.get('/', bookController.index);
router.post('/', bookController.store);
router.get('/:id', bookController.show);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);

module.exports = router