const express = require("express");
const router = express.Router();
const { getFavorite, addFavorite, removeFavorite } = require("../controller/favoritesController")

// Session-based endpoints (user inferred from session)
router.get("/", getFavorite);
router.post("/", addFavorite);
router.delete("/:mal_id", removeFavorite);

module.exports = router;