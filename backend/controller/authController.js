const argon2 = require("argon2");
const User = require("../model/userModel");
const { validationResult } = require("express-validator");

/**
 * Đăng ký người dùng mới
 */
exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Kiểm tra xem email hoặc username đã tồn tại chưa
    const existingUser = await User.findByIdentifier(email);
    if (existingUser) {
      return res.status(400).json({ 
        message: "Email hoặc tên người dùng đã được sử dụng" 
      });
    }

    // Kiểm tra thêm username
    const existingUsername = await User.findByIdentifier(username);
    if (existingUsername) {
      return res.status(400).json({ 
        message: "Email hoặc tên người dùng đã được sử dụng" 
      });
    }

    const hashedPassword = await argon2.hash(password, { 
      type: argon2.argon2id 
    });
    
    const userId = await User.createUser(username, email, hashedPassword);

    // Regenerate session để tránh session fixation
    await new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Tạo session đăng nhập ngay sau khi đăng ký
    req.session.user = { 
      userId, 
      email, 
      username 
    };

    res.status(201).json({
      message: "Đăng ký thành công",
      userId,
      username,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * Đăng nhập người dùng
 */
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { identifier, password } = req.body;

    // Tìm user theo email hoặc username
    const user = await User.findByIdentifier(identifier);
    if (!user) {
      return res.status(401).json({ 
        message: "Email/username hoặc mật khẩu không đúng" 
      });
    }

    // Kiểm tra mật khẩu
    const valid = await argon2.verify(user.user_hash_password, password);
    if (!valid) {
      return res.status(401).json({ 
        message: "Email/username hoặc mật khẩu không đúng" 
      });
    }

    // Regenerate session để tránh session fixation
    await new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Tạo session
    req.session.user = {
      userId: user.user_id,
      email: user.user_email,
      username: user.user_name,
    };

    res.status(200).json({
      message: "Đăng nhập thành công",
      userId: user.user_id,
      username: user.user_name,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * Đăng xuất người dùng
 */
exports.logout = async (req, res) => {
  try {
    const sessionName = process.env.SESSION_NAME || "sid";
    
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Không thể đăng xuất" });
      }
      res.clearCookie(sessionName);
      return res.status(200).json({ message: "Đăng xuất thành công" });
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

