const mongoose = require("mongoose");

const connectDb = async (URI) => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
