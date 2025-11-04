const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/auth");
const { check } = require("express-validator");

// Public routes (không cần token)
router.post(
  "/signup",
  [
    check("username").trim().isLength({ min: 3 }).withMessage("Tên phải từ 3 ký tự trở lên"),
    check("email").isEmail().withMessage("Email không hợp lệ").normalizeEmail(),
    check("password").isLength({ min: 8 }).withMessage("Mật khẩu tối thiểu 8 ký tự"),
    check("confirmPassword")
      .custom((val, { req }) => val === req.body.password)
      .withMessage("Mật khẩu xác nhận không khớp")
  ],
  userController.signup
);

router.post(
  "/login",
  [
    check("identifier").trim().notEmpty().withMessage("Vui lòng nhập email hoặc username"),
    check("password").notEmpty().withMessage("Vui lòng nhập mật khẩu")
  ],
  userController.login
);

router.post("/logout", authMiddleware, userController.logout);

// Protected routes (cần token)
router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;