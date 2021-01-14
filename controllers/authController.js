const User = require("../database/models/User");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const ErrorResponse = require("../models/ErrorResponse");
const SuccessResponse = require("../models/SuccessResponse");

exports.register = asyncMiddleware(async (req, res, next) => {
  const { name, email, password, gender } = req.body;
  const newUser = new User({ name, email, password, gender });
  const user = await newUser.save();
  res.status(200).json(new SuccessResponse(200, user));
});

exports.login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return next(
      new ErrorResponse(404, { email: "This email does not existed!" })
    );
  const isMatch = await user.passwordValidation(password);
  if (!isMatch)
    return next(new ErrorResponse(400, { password: "Password is incorrect!" }));
  const { _id, name, gender, isActive } = user;
  const token = User.genJwt({ _id, name, email, gender, isActive });
  res.status(200).json(
    new SuccessResponse(200, {
      user: { _id, name, email, gender, isActive },
      token,
    })
  );
});

exports.getCurrentUser = (req, res, next) => {
  const { name, email, gender, isActive } = req.user;
  res
    .status(200)
    .json(new SuccessResponse(200, { name, email, gender, isActive }));
};
