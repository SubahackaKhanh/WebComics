require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  cookieSecure: process.env.COOKIE_SECURE === "1",
  cookieSameSite: process.env.COOKIE_SAMESITE || "lax",
  trustProxy: process.env.TRUST_PROXY === "1",
  sessionName: process.env.SESSION_NAME || "sid",
  sessionSecret: process.env.SESSION_SECRET || "change_me_session_secret",
};
