import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const createExamValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("questionIds")
    .isArray({ min: 1 })
    .withMessage("questionIds must be a non-empty array"),

  body("questionIds.*")
    .isMongoId()
    .withMessage("Each questionId must be a valid Mongo ID"),
  handleValidationErrors,
];
