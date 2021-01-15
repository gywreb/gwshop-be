const express = require("express");
const authController = require("../controllers/authController");
const basicAuth = require("../middlewares/basicAuth");
const jwtAuth = require("../middlewares/jwtAuth");
const router = express.Router();

router.post("/register", basicAuth, authController.register);
router.post("/login", basicAuth, authController.login);
router.get("/logout", jwtAuth, authController.logout);
router.get("/current", jwtAuth, authController.getCurrentUser);

module.exports = router;
