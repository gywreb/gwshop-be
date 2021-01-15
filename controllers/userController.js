const User = require("../database/models/User");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const ErrorResponse = require("../models/ErrorResponse");
const SuccessResponse = require("../models/SuccessResponse");

exports.getAll = asyncMiddleware(async (req, res, next) => {
  const users = await User.find().select("-password");
  res.status(200).json(new SuccessResponse(200, users));
});

exports.getUserById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user)
    return next(new ErrorResponse(404, `user with id: ${id} not found`));
  res.status(200).json(new SuccessResponse(200, user));
});

exports.deleteAll = asyncMiddleware(async (req, res, next) => {
  const { deletedCount } = await User.deleteMany({
    _id: { $nin: req.user._id },
  });
  if (!deletedCount)
    return next(new ErrorResponse(500, "failed to delete users"));
  res
    .status(200)
    .json(new SuccessResponse(200, "successfully deleted all users"));
});

exports.deleteUserById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser)
    return next(new ErrorResponse(500, "failed to delete user"));
  res.status(200).json(new SuccessResponse(200, "successfully deleted user"));
});
