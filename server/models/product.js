const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: [true, "already present"],
  },
  productId: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
