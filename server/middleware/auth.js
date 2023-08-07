const { UnAuthorizedAccess } = require("../errors");
const jwt = require("jsonwebtoken");
// const User = require("../models/user");

const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new UnAuthorizedAccess("Authentication Invalid");
  }

  const token = authorization.split(" ")[1];

  try {
    const payLoad = await jwt.verify(token, process.env.JWT_SECRET);
    // attching user to job routes
    req.user = { userId: payLoad.userId, username: payLoad.name };
    next();
  } catch (error) {
    throw new UnAuthorizedAccess("Authentication Invalid");
  }
};

module.exports = authenticateUser;
