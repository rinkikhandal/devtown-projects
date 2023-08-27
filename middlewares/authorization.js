const { UnAuthorized, UnAuthorizedAccess } = require("../errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    throw new UnAuthorizedAccess("UnAuthorized Access");
  }

  token = token.split(" ")[1];
  try {
    payLoad = await jwt.decode(token, process.env.JWT_SECRET);
    req.user = { username: payLoad.username, userId: payLoad.userId };
    next();
  } catch (error) {
    throw new UnAuthorizedAccess("UnAuthorized Access");
  }
};

module.exports = authorization;
