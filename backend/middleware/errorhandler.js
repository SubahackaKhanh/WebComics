module.exports = (err, req, res, next) => {
  console.error("Error:", err);

  // CSRF error
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "CSRF token invalid" });
  }

  // Validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  // Default error
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
