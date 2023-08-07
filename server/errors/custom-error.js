class customApiError extends Error {
  constructor(message, statusCode) {
    super(message);
  }
}

module.exports = customApiError;
