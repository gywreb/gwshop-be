const ErrorResponse = require("../models/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  let errors = { ...err };

  // mongoose validation happen
  if (err.name === "ValidationError") {
    errors = new ErrorResponse(400, {});
    for (let error in err.errors) {
      errors.message[error] = err.errors[error].message;
    }
  }

  // duplicate key mongoose
  if (err.code === 11000) {
    errors = new ErrorResponse(400, {});
    for (let key in err.keyValue) {
      errors.message[key] = `${err.keyValue[key]} is already existed`;
    }
  }

  console.log(err.name, err.message, err.code);

  res.status(errors.code || 500).json({
    success: errors.success,
    code: errors.code || 500,
    message: errors.message || err.message,
  });

  next();
};

module.exports = errorHandler;
