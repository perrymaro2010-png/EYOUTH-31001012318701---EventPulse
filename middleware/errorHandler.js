const config = require('../config/config');
const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError")
    if (err.kind === "ObjectId") {
      err = new AppError(`Invalid ObjectId: ${err.value}`, 400);
    } else if (err.kind === "Number") {
      err = new AppError("Must be a Number", 400);
    } else if (err.kind === "String") {
      err = new AppError("Must be a String", 400);
    } else {
      err = new AppError("Invalid Data Type", 400);
    }
  if (err.name == "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");

    err = new AppError(message, 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err = new AppError(`${field} already exists`, 409);
  }
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    err = new AppError('Invalid or expired token', 401);
  }

  const statusCode = err.statusCode || 500;

  const body = {
    status: err.isOperational ? "fail" : "error",
    statusCode: err.isOperational ? statusCode : 500,
    message: err.isOperational ? err.message : "Server Error. Try Again Later.",
    data: null,
  };

  if (config.isDev) {
    body.stack = err.stack;
  }

  res.status(body.statusCode).json(body);
};

module.exports = errorHandler;
