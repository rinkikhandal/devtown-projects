const CustomApiError = require("./customError");
const statusCode = require("http-status-codes");

class NotFound extends CustomApiError {
  constructor(message) {
    super(message);
    this.status = statusCode.NOT_FOUND;
  }
}

module.exports = NotFound;
