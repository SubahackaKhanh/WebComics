const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./mysql_db")
const favoriteRoutes = require("./routes/favorite");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/favorite", favoriteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server now running on http://localhost:${PORT}`);
});