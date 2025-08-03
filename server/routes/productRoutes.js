const express = require("express");
const router = express.Router();
const { fetchProducts, createProduct, deleteProduct, updateProduct } = require("../controller/productController");

router.post("/fetch", fetchProducts);
router.post("/create", createProduct);
router.post("/delete", deleteProduct);
router.put("/update", updateProduct)

module.exports = router;