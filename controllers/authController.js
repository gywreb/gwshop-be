const User = require("../database/models/User");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const ErrorResponse = require("../models/ErrorResponse");
const SuccessResponse = require("../models/SuccessResponse");
const _ = require("lodash");

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

  const payload = _.omit(user._doc, ["password", "__v"]);
  const token = User.genJwt(payload);
  res.status(200).json(
    new SuccessResponse(200, {
      user: payload,
      token,
    })
  );
});

exports.getCurrentUser = (req, res, next) => {
  const currentUser = _.omit(req.user._doc, ["password", "__v"]);
  res.status(200).json(new SuccessResponse(200, currentUser));
};
