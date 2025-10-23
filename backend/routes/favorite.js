const express = require("express");
const router = express.Router();
const { getFavorite, addFavorite, removeFavorite } = require("../controller/favoritesController")

router.get("/:user_id", getFavorite);

router.post("/", addFavorite);

router.delete("/user_id/:mal_id", removeFavorite);

module.exports = router;