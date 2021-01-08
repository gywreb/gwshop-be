const User = require("../database/models/User");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");

exports.register = asyncMiddleware(async (req, res, next) => {
  const { name, email, password, gender } = req.body;
  const newUser = new User({ name, email, password, gender });
  const user = await newUser.save();
  res.status(200).json(new SuccessResponse(200, user));
});
