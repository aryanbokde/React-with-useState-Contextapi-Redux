const express = require("express");
const { registerUser, loginUser, logoutUser, forgetPassword } = require("../Controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgetPassword);
router.route("/user/:id").put().delete().get(); 


module.exports = router