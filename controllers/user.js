const {
  BadRequest,
  UnAuthorized,
  NotFound,
  UnAuthorizedAccess,
} = require("../errors/index.js");
const User = require("../models/user.js");
const statusCode = require("http-status-codes");

const getUserData = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new BadRequest("enter all the credentials");
  }
  const data = await User.create({ username, email, password });
  res.status(statusCode.OK).json({ success: true, data });
};

const getLoginData = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("enter email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("user not registered");
  }

  const comparedPassword = await user.comparePassword(password);
  if (!comparedPassword) {
    throw new UnAuthorizedAccess("Invalid Credentials");
  }

  const token = await user.createJwt();
  res.status(statusCode.OK).json({ succes: true, token });
};

module.exports = { getLoginData, getUserData };
