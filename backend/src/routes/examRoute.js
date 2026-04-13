import express from "express";
const router = express.Router();
import { TeacherAuth } from "../../middleware/auth.js";

import {
  createExam,
  getExamById,
  deleteExam,
  getAllExams,
  getExamResult,
} from "../Controllers/examController.js";
import { createExamValidator } from "../../middleware/examValidator.js";

router
  .get("/:id", TeacherAuth, getExamById)
  .delete("/:id", TeacherAuth, deleteExam)
  .post("/create", TeacherAuth, createExamValidator, createExam)
  .get("/", TeacherAuth, getAllExams)
  .get("/:examId/export", TeacherAuth, getExamResult);

export default router;
