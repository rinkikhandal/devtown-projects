const CustomApiError = require("./customError");
const statusCode = require("http-status-codes");

class UnAuthorizedAccess extends CustomApiError {
  constructor(message) {
    super(message);
    this.status = statusCode.UNAUTHORIZED;
  }
}

module.exports = UnAuthorizedAccess;
