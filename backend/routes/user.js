const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/auth");

// Protected routes (cần đăng nhập)
router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
