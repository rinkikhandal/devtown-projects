const CustomApiError = require("./customError");
const BadRequest = require("./badRequest");
const UnAuthorizedAccess = require("./unAuthorized");
const NotFound = require("./notFound");

module.exports = { CustomApiError, UnAuthorizedAccess, BadRequest, NotFound };
