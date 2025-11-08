const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { check } = require("express-validator");

// Route signup
router.post(
  "/signup",
  [
    check("username")
      .trim()
      .isLength({ min: 3 , max:20})
      .withMessage("Name must be from 3 to 20 characters")
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage("Name can only contain letters, numbers, and underscores."),
    check("email")
      .isEmail()
      .withMessage("Invalid Email")
      .normalizeEmail(),
    check("password")
      .isLength({ min: 8, max: 64})
      .withMessage("Password must be between 8 and 64 characters long")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/)
      .withMessage("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."),
    check("confirmPassword")
      .custom((val, { req }) => val === req.body.password)
      .withMessage("Password do not match."),
  ],
  authController.signup
);

// Route login
router.post(
  "/login",
  [
    check("identifier")
      .trim()
      .notEmpty()
      .withMessage("Please enter your username or email"),
    check("password")
      .notEmpty()
      .withMessage("Please enter your password"),
  ],
  authController.login
);

// Route logout (No auth middleware cuz can using logout even didn't login)
router.post("/logout", authController.logout);

module.exports = router;

