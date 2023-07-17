const express = require('express');
const { createProduct, getAllProducts,fetchProductByID, fetchAllProductsByFilter, updateProduct } = require("../controller/Product")

const router = express.Router();

router.post('/', createProduct);
router.get('/', fetchAllProductsByFilter)
router.get('/', getAllProducts);
router.get('/:id', fetchProductByID);
router.patch('/:id',updateProduct)


exports.router = router;



