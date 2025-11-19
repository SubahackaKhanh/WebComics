const yup = require("yup");

// Schema đăng ký
const signupSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .required("Username is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password cannot exceed 64 characters")
    .matches(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .matches(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .matches(/^(?=.*\d)/, "Password must contain at least one number")
    .matches(/^(?=.*[!@#$%^&*])/, "Password must contain at least one special character")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
});

// Schema đăng nhập
const loginSchema = yup.object({
  identifier: yup
    .string()
    .trim()
    .required("Please enter your username or email"),

  password: yup.string().required("Please enter your password"),
});

module.exports = { signupSchema, loginSchema };
