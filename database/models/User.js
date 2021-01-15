const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "invalid email"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "password must be at least 6 characters"],
      required: [true, "password is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "gender can only be male or female",
      },
      required: [true, "gender is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    photoUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.statics.genJwt = function (payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.passwordValidation = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema, "users");
