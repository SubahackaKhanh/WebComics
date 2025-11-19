module.exports = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Dữ liệu không hợp lệ",
        errors: err.errors,
      });
    }
    next(err);
  }
};
