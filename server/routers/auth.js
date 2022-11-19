const express = require("express");
const {protect} =  require("../middleware/protected");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
router.route("/profile").get(protect, userController.getUserProfile);

module.exports = router;
