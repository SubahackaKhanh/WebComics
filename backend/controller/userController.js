/**
 * Lấy thông tin profile của người dùng hiện tại
 */
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
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
