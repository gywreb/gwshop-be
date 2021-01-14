const express = require("express");
const authController = require("../controllers/authController");
const jwtAuth = require("../middlewares/jwtAuth");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.route("/current").get(jwtAuth, authController.getCurrentUser);

module.exports = router;
