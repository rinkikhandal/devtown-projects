const express = require("express");
const { registerData, loginData } = require("../controllers/users");
const router = express.Router();

router.route("/register/").post(registerData);
router.route("/login/").post(loginData);

module.exports = router;
