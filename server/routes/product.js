const express = require("express");
const router = express.Router();
const {
  createProducts,
  getProducts,
  getCartProducts,
  deleteProduct,
} = require("../controllers/products");

router.route("/").get(getProducts);
router.route("/cart").get(getCartProducts).post(createProducts);
router.route("/cart/:id").delete(deleteProduct);

module.exports = router;
