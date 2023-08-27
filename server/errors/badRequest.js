const CustomApiError = require("./customError");
const statusCode = require("http-status-codes");

class BadRequest extends CustomApiError {
  constructor(message) {
    super(message);
    this.status = statusCode.BAD_REQUEST;
  }
}

module.exports = BadRequest;
