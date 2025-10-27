const pool = require("../mysql_db");

exports.createUser = async (username, email, hash) => {
  const sql = `INSERT INTO users (user_name, user_email, user_hash_password) VALUES (?, ?, ?)`;
  const [result] = await pool.query(sql, [username, email, hash]);
  return result.insertId;
};

exports.findByIdentifier = async (identifier) => {
  const sql = `
    SELECT * FROM users 
    WHERE user_email = ? OR user_name = ?
  `;
  const [rows] = await pool.query(sql, [identifier, identifier]);
  return rows[0];
};

