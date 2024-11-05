const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers.js")

router.route("/").get(userControllers.getUsers);

router.route("/signup").post(userControllers.signupUser);

router.route("/login").post(userControllers.loginUser);

router.route("/logout").get(userControllers.logout)


module.exports = router
