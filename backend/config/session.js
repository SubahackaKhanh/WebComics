const session = require("express-session");
const MySQLStoreFactory = require("express-mysql-session");
const pool = require("../mysql_db");
const { sessionName, sessionSecret, cookieSecure, cookieSameSite } = require("./env");

const MySQLStore = MySQLStoreFactory(session);

const sessionStore = new MySQLStore(
  {
    clearExpired: true,
    checkExpirationInterval: 15 * 60 * 1000,
  },
  pool
);

module.exports = session({
  name: sessionName,
  secret: sessionSecret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: cookieSecure,
    sameSite: cookieSameSite,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});
