const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { check } = require("express-validator");

// Route đăng ký
router.post(
  "/signup",
  [
    check("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Tên phải từ 3 ký tự trở lên")
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage("Tên chỉ được chứa chữ cái, số và dấu gạch dưới"),
    check("email")
      .isEmail()
      .withMessage("Email không hợp lệ")
      .normalizeEmail(),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Mật khẩu tối thiểu 8 ký tự")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage("Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"),
    check("confirmPassword")
      .custom((val, { req }) => val === req.body.password)
      .withMessage("Mật khẩu xác nhận không khớp"),
  ],
  authController.signup
);

// Route đăng nhập
router.post(
  "/login",
  [
    check("identifier")
      .trim()
      .notEmpty()
      .withMessage("Vui lòng nhập email hoặc username"),
    check("password")
      .notEmpty()
      .withMessage("Vui lòng nhập mật khẩu"),
  ],
  authController.login
);

// Route đăng xuất (không cần auth middleware vì có thể logout khi chưa đăng nhập)
router.post("/logout", authController.logout);

module.exports = router;

