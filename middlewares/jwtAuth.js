const jwt = require("jsonwebtoken");
const User = require("../database/models/User");
const ErrorResponse = require("../models/ErrorResponse");

const jwtAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.token) token = req.cookies.token;
  if (!token) return next(new ErrorResponse(401, "You are unauthorzied!"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try {
      req.user = await User.findOne({ email: decoded.email });
      if (!req.user)
        return next(new ErrorResponse(401, "You are unauthorzied!"));
      next();
    } catch (error) {}
  } catch (error) {
    next(new ErrorResponse(401, "You are unauthorize!"));
  }
};

module.exports = jwtAuth;
