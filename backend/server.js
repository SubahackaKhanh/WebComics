const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./mysql_db")

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Backend is running"});
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log(' DB test query result:', rows[0].result);
    res.json({ message: "DB connected!", result: rows[0].result });
  } catch (err) {
    console.error(' DB test failed:', err.message);
    res.status(500).json({ message: "DB connection failed" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server now running on http://localhost:${PORT}`);
});