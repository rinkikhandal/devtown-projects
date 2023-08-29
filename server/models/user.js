const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "please enter username"],
    maxlength: [30, "username cannot be more than 30 letters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please enter the email"],
    Validate: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "invalid email",
    ],
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    require: [true, "password needed"],
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.methods.createJwt = async function () {
  const token = await jwt.sign(
    { username: this.username, userId: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXP }
  );

  return token;
};

const User = mongoose.model("User", UserSchema);

mongoose.connection.once("open", () => {
  // Create unique index on 'email' field
  User.collection.createIndex({ email: 1 }, { unique: true });
});

module.exports = User;
