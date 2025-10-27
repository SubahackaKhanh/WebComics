const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Lấy token từ header Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: "Không có token, truy cập bị từ chối" 
      });
    }

    const token = authHeader.split(" ")[1]; // Lấy token sau "Bearer "

    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Gắn thông tin user vào req để controller sử dụng
    req.user = decoded; // { userId, email, username }
    
    next(); // Cho phép tiếp tục xử lý request
  } catch (error) {
    res.status(401).json({ 
      message: "Token không hợp lệ hoặc đã hết hạn" 
    });
  }
};

module.exports = authMiddleware;