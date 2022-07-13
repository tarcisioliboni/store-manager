const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.addProduct);
router.delete('/:id', productController.removeProduct);

module.exports = router;
