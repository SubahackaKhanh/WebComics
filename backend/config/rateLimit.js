const rateLimit = require("express-rate-limit");

module.exports = {
  loginLimiter: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Quá nhiều lần thử đăng nhập, vui lòng thử lại sau.",
  }),

  signupLimiter: rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: "Quá nhiều lần thử đăng ký, vui lòng thử lại sau.",
  }),

  generalLimiter: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Quá nhiều yêu cầu, vui lòng thử lại sau.",
  }),
};
