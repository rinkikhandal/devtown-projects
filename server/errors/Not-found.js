const customApiError = require("./custom-error");
const StatusCodes = require("http-status-codes");

class NotFoundError extends customApiError {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
