const express = require("express");
const router = express.Router();
const { Login, Register, fetchUser } = require("../controller/userController");

router.post("/register", Register);
router.post("/login", Login);
router.post("/fetchUser", fetchUser);

module.exports = router;