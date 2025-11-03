const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MySQLStoreFactory = require("express-mysql-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const pool = require("./mysql_db");
const favoriteRoutes = require("./routes/favorite");
const userRoutes = require("./routes/user");

const app = express();

// Trust proxy if behind reverse proxy (e.g., for secure cookies)
if (process.env.TRUST_PROXY === "1") {
  app.set("trust proxy", 1);
}

// CORS with credentials to allow cookie session
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Session store in MySQL
const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({}, pool.promise());

app.use(
  session({
    name: process.env.SESSION_NAME || "sid",
    secret: process.env.SESSION_SECRET || "change_me_session_secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "1", // set 1 in production with HTTPS
      sameSite: process.env.COOKIE_SAMESITE || "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

app.use("/favorite", require("./middleware/auth"), favoriteRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server now running on http://localhost:${PORT}`);
});