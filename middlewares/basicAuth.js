const ErrorResponse = require("../models/ErrorResponse");

const basicAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Basic")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new ErrorResponse(401, "you are unauthorized"));

  const decoded = new Buffer.from(token, "base64").toString();

  if (
    !(
      `${process.env.BASICAUTH_USER}:${process.env.BASICAUTH_PASSWORD}` ===
      decoded
    )
  ) {
    return next(new ErrorResponse(401, "you are unauthorized"));
  }

  next();
};

module.exports = basicAuth;
