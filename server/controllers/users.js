const { StatusCodes } = require("http-status-codes");
const { BadRequest, UnAuthorizedAccess } = require("../errors/index");
const User = require("../models/user");

const registerData = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.OK).json({
    success: true,
    msg: `hello ${user.name} your account has been created`,
  });
};

const loginData = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("please enter email and password");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new UnAuthorizedAccess(
      "This account does not exist please register first"
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthorizedAccess("INVALID CREDENTIALS");
  }
  const token = user.createJWT();
  res.status(200).json({ succes: true, msg: `hello ${user.name} `, token });
};

module.exports = { loginData, registerData };
