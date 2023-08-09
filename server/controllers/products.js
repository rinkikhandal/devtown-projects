const Products = require("../models/product");
const fs = require("fs/promises");
const StatusCodes = require("http-status-codes");
const { BadRequest, NotFoundError } = require("../errors/index");

const getProducts = async (req, res) => {
  const data = await fs.readFile("./db/productStore.json", "utf8");
  const parsedData = JSON.parse(data);
  res.status(StatusCodes.OK).json({ success: true, parsedData });
};

const addProducts = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    throw new BadRequest("Bad Credentials : please enter the id of product");
  }

  const data = await fs.readFile("./db/productStore.json", "utf8");
  const parsedData = JSON.parse(data);

  let product = parsedData.find(
    (product) => product.productId === Number(productId)
  );

  if (!product) {
    throw new NotFoundError(`no product with id: ${productId}`);
  }

  product.cartHolder = req.user.userId;

  const addedToDB = await Products.create({
    ...product,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    msg: `hello ${req.user.username.toUpperCase()} the product ${addedToDB.productName.toUpperCase()} has been added to your cart`,
  });
};

const getCartProducts = async (req, res) => {
  const products = await Products.find({ cartHolder: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ success: true, product_ADDED_TO_Cart: products });
};

const deleteProduct = async (req, res) => {
  const {
    params: { productId },
    user: { userId },
  } = req;
  const { productName } = await Products.findOne({
    productId,
    cartHolder: userId,
  });

  if (!productName) {
    throw new NotFoundError(`no product with id: ${id}`);
  }

  const product = await Products.deleteOne({ productId, cartHolder: userId });

  res.status(StatusCodes.OK).json({
    success: true,
    msg: `hello ${req.user.username.toUpperCase()} the product ${productName.toUpperCase()} has been removed from your cart `,
    product,
  });
};

module.exports = {
  addProducts,
  getProducts,
  deleteProduct,
  getCartProducts,
};
