const customApiError = require("./custom-error");
const UnAuthorizedAccess = require("./unauthorized-access");
const BadRequest = require("./bad-request");
const NotFoundError = require("./Not-found");

module.exports = {
  customApiError,
  UnAuthorizedAccess,
  BadRequest,
  NotFoundError,
};
