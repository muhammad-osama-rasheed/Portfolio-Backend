const express = require("express");
const router = express.Router();

const {
  signupValidation,
  loginValidation,
} = require("../middlewares/authValidation");
const { signup, login } = require("../controllers/authController");

router.post("/signup", signupValidation, signup);

router.post("/login", loginValidation, login);

module.exports = router;
