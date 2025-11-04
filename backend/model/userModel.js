const pool = require("../mysql_db");

/**
 * Tạo người dùng mới
 * @param {string} username - Tên người dùng
 * @param {string} email - Email
 * @param {string} hash - Mật khẩu đã hash
 * @returns {Promise<number>} - ID của người dùng mới tạo
 */
exports.createUser = async (username, email, hash) => {
  const sql = `INSERT INTO users (user_name, user_email, user_hash_password) VALUES (?, ?, ?)`;
  const [result] = await pool.query(sql, [username, email, hash]);
  return result.insertId;
};

/**
 * Tìm người dùng theo email hoặc username
 * @param {string} identifier - Email hoặc username
 * @returns {Promise<Object|null>} - Thông tin người dùng hoặc null
 */
exports.findByIdentifier = async (identifier) => {
  const sql = `
    SELECT user_id, user_name, user_email, user_hash_password 
    FROM users 
    WHERE user_email = ? OR user_name = ?
    LIMIT 1
  `;
  const [rows] = await pool.query(sql, [identifier, identifier]);
  return rows[0] || null;
};

/**
 * Tìm người dùng theo ID
 * @param {number} userId - ID người dùng
 * @returns {Promise<Object|null>} - Thông tin người dùng hoặc null
 */
exports.findById = async (userId) => {
  const sql = `
    SELECT user_id, user_name, user_email 
    FROM users 
    WHERE user_id = ?
    LIMIT 1
  `;
  const [rows] = await pool.query(sql, [userId]);
  return rows[0] || null;
};
