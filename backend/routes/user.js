const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/auth"); // Import middleware

// Public routes (không cần token)
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);

// Protected routes (cần token)
router.get("/profile", authMiddleware, userController.getProfile); 
// router.put("/profile", authMiddleware, userController.updateProfile); 

module.exports = router;