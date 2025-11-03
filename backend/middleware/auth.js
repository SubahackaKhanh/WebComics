const authMiddleware = (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      req.user = req.session.user; // { userId, email, username }
      return next();
    }
    return res.status(401).json({ message: "Chưa đăng nhập" });
  } catch (error) {
    return res.status(401).json({ message: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn" });
  }
};

module.exports = authMiddleware;