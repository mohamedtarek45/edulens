import { param, body } from "express-validator";
const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};


export const startExamValidator = [
  param("examId")
    .isMongoId()
    .withMessage("Invalid exam ID"),
    handleValidationErrors,
];


export const submitExamValidator = [
  param("attemptId")
    .isMongoId()
    .withMessage("Invalid attempt ID"),

  body("answers")
    .isObject()
    .withMessage("Answers must be an object"),

  body("answers.*")
    .isString()
    .withMessage("Each answer must be a string"),
    handleValidationErrors,
];


export const getResultValidator = [
  param("examId")
    .isMongoId()
    .withMessage("Invalid exam ID"),
    handleValidationErrors,
];