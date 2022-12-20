const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require("../Controllers/productController");
const router = express.Router();

router.route("/product/new").post(createProduct);
router.route("/products").get(getAllProducts);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetail); 


module.exports = router