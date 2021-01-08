const errorHandler = (err, req, res, next) => {
  let errors = { ...err };

  res.status(errors.code || 500).json({
    success: errors.success,
    code: errors.code || 500,
    message: errors.message || "server error",
  });
};

module.exports = errorHandler;
