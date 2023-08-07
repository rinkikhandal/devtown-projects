const mongoose = require("mongoose");

const connectDB = async (connectionString) => {
  await mongoose.connect(connectionString);
};

module.exports = connectDB;
