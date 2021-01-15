const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwtAuth = require("../middlewares/jwtAuth");

router.use(jwtAuth);
router.route("/").get(userController.getAll).delete(userController.deleteAll);
router
  .route("/:id")
  .get(userController.getUserById)
  .delete(userController.deleteUserById);

module.exports = router;
