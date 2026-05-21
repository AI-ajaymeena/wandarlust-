const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const userController = require("../controllers/user.js")

router.route("/signup").get(userController.signupRenderForm).post(WrapAsync(userController.signup));

router.route("/login").get(userController.loginRenderForm)
    .post(passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }), userController.login);

router.get("/logout", userController.logoutcontroller)


module.exports = router;