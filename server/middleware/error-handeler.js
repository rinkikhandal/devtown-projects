const customApiError = require("../errors/custom-error");

const errorHandeler = (err, req, res, next) => {
  if (err instanceof customApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(500).json({ err, msg: "something went wrong" });
};

module.exports = errorHandeler;
