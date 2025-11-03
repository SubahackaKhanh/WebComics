const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Ưu tiên session-based auth
    if (req.session && req.session.user) {
      req.user = req.session.user; // { userId, email, username }
      return next();
    }

    // Fallback: JWT từ header (để tương thích ngược)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    }

    return res.status(401).json({ message: "Chưa đăng nhập" });
  } catch (error) {
    return res.status(401).json({ message: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn" });
  }
};

module.exports = authMiddleware;