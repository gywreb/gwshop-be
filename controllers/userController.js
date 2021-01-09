const User = require("../database/models/User");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");

exports.getAll = asyncMiddleware(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(new SuccessResponse(200, users));
});
