import express from "express";
const router = express.Router();
import { TeacherAuth } from "../../middleware/auth.js";

import {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} from "../Controllers/questionController.js";
import {
  createQuestionValidator,
  deleteQuestionValidator,
  updateQuestionValidator,
} from "../../middleware/questionValidator.js";

router
  .post("/", TeacherAuth, createQuestionValidator, createQuestion)
  .get("/", TeacherAuth, getQuestions)
  .put("/:id", TeacherAuth, updateQuestionValidator, updateQuestion)
  .delete("/:id", TeacherAuth, deleteQuestionValidator, deleteQuestion);

export default router;
