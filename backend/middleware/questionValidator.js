import { body, param ,validationResult} from "express-validator";

const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const createQuestionValidator = [
  body("question").notEmpty().withMessage("Question is required"),

  body("options")
    .isArray({ min: 4, max: 4 })
    .withMessage("Options must be exactly 4"),

  body("options.*").notEmpty().withMessage("Option cannot be empty"),

  body("correctAnswer")
    .notEmpty()
    .withMessage("Correct answer is required")
    .custom((value, { req }) => {
      if (!req.body.options.includes(value)) {
        throw new Error("Correct answer must be one of the options");
      }
      return true;
    }),

  body("image").optional().isString().withMessage("Image must be a string URL"),
  handleValidationErrors,
];

export const updateQuestionValidator = [
  param("id").isMongoId().withMessage("Invalid question ID"),

  body("question")
    .optional()
    .notEmpty()
    .withMessage("Question cannot be empty"),

  body("options")
    .optional()
    .isArray({ min: 4, max: 4 })
    .withMessage("Options must be exactly 4"),

  body("correctAnswer")
    .optional()
    .custom((value, { req }) => {
      if (req.body.options && !req.body.options.includes(value)) {
        throw new Error("Correct answer must match options");
      }
      return true;
    }),
  handleValidationErrors,
];

export const deleteQuestionValidator = [
  param("id").isMongoId().withMessage("Invalid question ID"),
  handleValidationErrors,
];
