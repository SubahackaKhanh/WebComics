const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Thiếu thông tin" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu không khớp" });
    }

    // Kiểm tra xem email hoặc username đã tồn tại chưa
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
    const userId = await User.createUser(username, email, hashedPassword);

    // Tạo JWT token
    const token = jwt.sign(
      { userId, email, username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Đăng ký thành công",
      userId,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "Thiếu email/username hoặc mật khẩu" });
    }

    // Tìm user theo email hoặc username
    const user = await User.findByIdentifier(identifier);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Kiểm tra mật khẩu
    const valid = await argon2.verify(user.user_hash_password, password);
    if (!valid) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.user_email,
        username: user.user_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Đăng nhập thành công",
      userId: user.user_id,
      username: user.user_name,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { userId, email, username } = req.user;

    res.status(200).json({
      message: "Lấy thông tin thành công",
      user: {
        id: userId,
        username,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};