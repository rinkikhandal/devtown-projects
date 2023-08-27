const statusCode = require("http-status-codes");
const CustomApiError = require("../errors/customError.js");

const errorHandeler = (err, req, res, next) => {
  let customError = {
    status: err.status || statusCode.INTERNAL_SERVER_ERROR,
    message: err.message || "something went wrong please try again later",
  };

  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(",");
    customError.status = 400;
  }

  if (err.code && err.code === 1100) {
    customError.message = `Duplicate value for ${Object.keys(
      err.KeyValue
    )}, please choose another value`;
    customError.status = 400;
  }

  if (err.name === "CastError") {
    customError.message = `No item with id ${err.value}`;
    customError.status = 404;
  }

  return res
    .status(customError.status)
    .json({ success: false, msg: customError.message });
};

module.exports = errorHandeler;
