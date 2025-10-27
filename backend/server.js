const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./mysql_db");
const favoriteRoutes = require("./routes/favorite"); // thêm favorite route
const userRoutes = require("./routes/user"); // Thêm user routes

const app = express();
app.use(cors());
app.use(express.json());

app.use("/favorite", require("./middleware/auth"), favoriteRoutes); // thêm route cho favorite
app.use("/user", userRoutes); // Thêm route cho user

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server now running on http://localhost:${PORT}`);
});