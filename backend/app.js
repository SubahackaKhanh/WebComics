const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const corsConfig = require("./config/cors");
const helmetConfig = require("./config/helmet");
const sessionConfig = require("./config/session");
const { loginLimiter, signupLimiter, generalLimiter } = require("./config/rateLimit");
const { trustProxy } = require("./config/env");

const favoriteRoutes = require("./routes/favorite");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const app = express();

// Trust proxy
if (trustProxy) app.set("trust proxy", 1);

// Middlewares
app.use(corsConfig);
app.use(helmetConfig);

app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use(generalLimiter);

app.use(sessionConfig);

const csrfProtection = csrf({
  cookie: true,
});
app.use(csrfProtection);

// Routes
app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use("/auth/login", loginLimiter);
app.use("/auth/signup", signupLimiter);

app.use("/auth", authRoutes);

app.use("/favorite", require("./middleware/auth"), favoriteRoutes);
app.use("/user", userRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: "Can't find route" }));

// Error handler
app.use(require("./middleware/errorhandler"));

module.exports = app;
