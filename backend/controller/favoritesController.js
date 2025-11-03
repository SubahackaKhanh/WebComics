const pool = require("../mysql_db")

async function getFavorite(req, res) {
    const sessionUserId = req.user?.userId;
    if (!sessionUserId) return res.status(401).json({ message: "Chưa đăng nhập" });
    try{
        const [rows] = await pool.query("SELECT * FROM user_favorite WHERE user_id = ?", [sessionUserId]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
}

async function addFavorite (req, res){
    const sessionUserId = req.user?.userId;
    if (!sessionUserId) return res.status(401).json({ message: "Chưa đăng nhập" });
    const { mal_id, title, image, genres } = req.body;
    try {
        await pool.query("INSERT INTO user_favorite (user_id, mal_id, tittle, image, genres) VALUES (?, ?, ?, ?, ?)", [sessionUserId, mal_id, title, image, JSON.stringify(genres || [])]);
        res.json({ message: "Added to favorites" });
    } catch (err){
        console.error(err);
        res.status(500).json({ error: "Database error"});
    }
}

async function removeFavorite(req, res){
    const sessionUserId = req.user?.userId;
    if (!sessionUserId) return res.status(401).json({ message: "Chưa đăng nhập" });
    const { mal_id } = req.params;
    try{
        await pool.query("DELETE FROM user_favorite WHERE user_id = ? AND mal_id = ?", [sessionUserId, mal_id]);
        res.json({ message: "Removed from favorites" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
}

module.exports = { getFavorite, addFavorite, removeFavorite};