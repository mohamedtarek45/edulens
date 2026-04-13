import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
export const validateLogin = [
  body("email").isEmail().withMessage("Email is invalid").notEmpty().withMessage("Email is required"),
  body("password").isString().notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];
export const validateCreateUser = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is invalid1"),
  body("password").isString().notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("role").isString().isIn(["teacher", "student"]),
  handleValidationErrors,
];