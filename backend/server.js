// const express = require("express");
// const cors = require("cors");
// const session = require("express-session");
// const MySQLStoreFactory = require("express-mysql-session");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();

// const pool = require("./mysql_db");
// const favoriteRoutes = require("./routes/favorite");
// const userRoutes = require("./routes/user");
// const authRoutes = require("./routes/auth");

// const csrf = require("csurf");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");

// const app = express();

// // Trust proxy if behind reverse proxy (e.g., for secure cookies)
// if (process.env.TRUST_PROXY === "1") {
//   app.set("trust proxy", 1);
// }

// // Rate limiters
// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // 5 requests per windowMs
//   message: "Quá nhiều lần thử đăng nhập, vui lòng thử lại sau.",
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// const signupLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 3, // 3 requests per hour
//   message: "Quá nhiều lần thử đăng ký, vui lòng thử lại sau.",
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// const generalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // 100 requests per windowMs
//   message: "Quá nhiều yêu cầu, vui lòng thử lại sau.",
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// // CORS with credentials to allow cookie session
// const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
// app.use(
//   cors({
//     origin: allowedOrigin,
//     credentials: true,
//   })
// );

// // Security middleware
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         styleSrc: ["'self'", "'unsafe-inline'"], // allow inline styles 
//         scriptSrc: ["'self'"],
//         imgSrc: ["'self'", "data:", "https:"], // allow images from HTTPS
//         connectSrc: ["'self'", allowedOrigin], // allow fetch api from fe
//       },
//     },
//   })
// );

// // Body parsing middleware
// app.use(cookieParser());
// app.use(express.json({ limit: "1mb" }));
// app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// // Apply general rate limiting
// app.use(generalLimiter);

// // Session store in MySQL
// const MySQLStore = MySQLStoreFactory(session);
// const sessionStore = new MySQLStore({}, pool);

// app.use(
//   session({
//     name: process.env.SESSION_NAME || "sid",
//     secret: process.env.SESSION_SECRET || "change_me_session_secret",
//     resave: false,
//     saveUninitialized: false,
//     store: sessionStore,
//     cookie: {
//       httpOnly: true,
//       secure: process.env.COOKIE_SECURE === "1", // set 1 in production with HTTPS
//       sameSite: process.env.COOKIE_SAMESITE || "lax",
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
//     },
//   })
// );

// // CSRF protection (attach middleware globally, but ignore safe methods)
// const csrfProtection = csrf({
//   cookie: {
//     httpOnly: true,
//     sameSite: process.env.COOKIE_SAMESITE || "lax",
//     secure: process.env.COOKIE_SECURE === "1",
//   },
//   ignoreMethods: ["GET", "HEAD", "OPTIONS"],
// });

// app.use(csrfProtection);

// // Endpoint to provide CSRF token to the frontend
// app.get("/csrf-token", (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

// // Health check endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", message: "Server is running" });
// });

// // Apply rate limiting BEFORE mounting auth routes
// app.use("/auth/login", loginLimiter);
// app.use("/auth/signup", signupLimiter);

// // Authentication routes (public)
// app.use("/auth", authRoutes);

// // Protected routes (require authentication)
// app.use("/favorite", require("./middleware/auth"), favoriteRoutes);
// app.use("/user", userRoutes);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: "Can't find route" });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Error:", err);

//   // CSRF error
//   if (err.code === "EBADCSRFTOKEN") {
//     return res.status(403).json({ message: "CSRF token invalid" });
//   }

//   // Validation error
//   if (err.name === "ValidationError") {
//     return res.status(400).json({ message: err.message });
//   }

//   // Default error
//   res.status(err.status || 500).json({
//     message: err.message || "Server Error",
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(` Server đang chạy tại http://localhost:${PORT}`);
// });

const app = require("./app");
const { port } = require("./config/env");

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
