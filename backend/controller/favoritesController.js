const pool = require("../mysql_db");

/**
 * Lấy danh sách yêu thích của người dùng
 */
async function getFavorite(req, res) {
  try {
    const sessionUserId = req.user?.userId;
    
    if (!sessionUserId) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM user_favorite WHERE user_id = ? ORDER BY created_at DESC",
      [sessionUserId]
    );
    
    res.status(200).json({
      message: "Lấy danh sách yêu thích thành công",
      favorites: rows,
    });
  } catch (err) {
    console.error("Get favorite error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
}

/**
 * Thêm một mục vào danh sách yêu thích
 */
async function addFavorite(req, res) {
  try {
    const sessionUserId = req.user?.userId;
    
    if (!sessionUserId) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const { mal_id, title, image, genres } = req.body;

    // Validation
    if (!mal_id || !title) {
      return res.status(400).json({ 
        message: "mal_id và title là bắt buộc" 
      });
    }

    // Kiểm tra xem đã có trong danh sách yêu thích chưa
    const [existing] = await pool.query(
      "SELECT * FROM user_favorite WHERE user_id = ? AND mal_id = ?",
      [sessionUserId, mal_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        message: "Đã có trong danh sách yêu thích" 
      });
    }

    // Thêm vào danh sách yêu thích
    // Note: Nếu database column là "tittle" thay vì "title", cần thay đổi tương ứng
    await pool.query(
      "INSERT INTO user_favorite (user_id, mal_id, title, image, genres) VALUES (?, ?, ?, ?, ?)",
      [
        sessionUserId,
        mal_id,
        title,
        image || null,
        JSON.stringify(genres || []),
      ]
    );

    res.status(201).json({ 
      message: "Đã thêm vào danh sách yêu thích",
      mal_id,
    });
  } catch (err) {
    console.error("Add favorite error:", err);
    
    // Kiểm tra lỗi duplicate entry
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ 
        message: "Đã có trong danh sách yêu thích" 
      });
    }
    
    res.status(500).json({ message: "Lỗi server" });
  }
}

/**
 * Xóa một mục khỏi danh sách yêu thích
 */
async function removeFavorite(req, res) {
  try {
    const sessionUserId = req.user?.userId;
    
    if (!sessionUserId) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const { mal_id } = req.params;

    if (!mal_id) {
      return res.status(400).json({ message: "mal_id là bắt buộc" });
    }

    const [result] = await pool.query(
      "DELETE FROM user_favorite WHERE user_id = ? AND mal_id = ?",
      [sessionUserId, mal_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Không tìm thấy trong danh sách yêu thích" 
      });
    }

    res.status(200).json({ 
      message: "Đã xóa khỏi danh sách yêu thích",
      mal_id,
    });
  } catch (err) {
    console.error("Remove favorite error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
}

module.exports = { getFavorite, addFavorite, removeFavorite };
