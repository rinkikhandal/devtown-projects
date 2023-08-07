const customApiError = require("./custom-error");

const StatusCodes = require("http-status-codes");

class UnAuthorizedAccess extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnAuthorizedAccess;
