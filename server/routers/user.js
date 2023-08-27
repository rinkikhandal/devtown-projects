const express = require("express");
const { getLoginData, getUserData } = require("../controllers/user.js");

const router = express.Router();

router.route("/register").post(getUserData);

router.route("/login").post(getLoginData);

module.exports = router;
