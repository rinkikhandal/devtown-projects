const express = require("express");
const router = express.Router();
const {
  addProducts,
  getProducts,
  getCartProducts,
  deleteProduct,
} = require("../controllers/products");

router.route("/").get(getProducts);
router.route("/cart").get(getCartProducts).post(addProducts);
router.route("/cart/:productId").delete(deleteProduct);

module.exports = router;
