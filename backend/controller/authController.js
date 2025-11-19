const argon2 = require("argon2");
const User = require("../model/userModel");
const { signupSchema, loginSchema } = require("../validators/authValidator");

/**
 * Đăng ký người dùng mới
 */
exports.signup = async (req, res, next) => {
  try {
    // Yup validate
    await signupSchema.validate(req.body, { abortEarly: false });

    const { username, email, password } = req.body;

    const existingUser = await User.findByIdentifier(email);
    const existingUsername = await User.findByIdentifier(username);

    if (existingUser || existingUsername) {
      return res.status(400).json({
        message: "Email hoặc tên người dùng đã được sử dụng",
      });
    }

    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    const userId = await User.createUser(username, email, hashedPassword);

    await new Promise((resolve, reject) => {
      req.session.regenerate((err) => (err ? reject(err) : resolve()));
    });

    req.session.user = { userId, email, username };

    res.status(201).json({
      message: "Đăng ký thành công",
      userId,
      username,
    });
  } catch (err) {
    // Yup error
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid data",
        errors: err.errors, // array lỗi FE xử lý dễ
      });
    }
    next(err);
  }
};

/**
 * Đăng nhập người dùng
 */
exports.login = async (req, res, next) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });

    const { identifier, password } = req.body;

    const user = await User.findByIdentifier(identifier);

    if (!user) {
      return res.status(401).json({
        message: "Email/username hoặc mật khẩu không đúng",
      });
    }

    const valid = await argon2.verify(user.user_hash_password, password);

    if (!valid) {
      return res.status(401).json({
        message: "Email/username hoặc mật khẩu không đúng",
      });
    }

    await new Promise((resolve, reject) =>
      req.session.regenerate((err) => (err ? reject(err) : resolve()))
    );

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
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid data",
        errors: err.errors,
      });
    }
    next(err);
  }
};

exports.logout = async (req, res) => {
  try {
    const sessionName = process.env.SESSION_NAME || "sid";

    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Không thể đăng xuất" });
      }

      // Clear cookie an toàn, đúng cài đặt session
      res.clearCookie(sessionName, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "1",
        sameSite: process.env.COOKIE_SAMESITE || "lax",
      });

      return res.status(200).json({ message: "Đăng xuất thành công" });
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

