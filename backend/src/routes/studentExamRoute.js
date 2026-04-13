import express from "express";
const router = express.Router();
import { authRequired, StudentAuth} from "../../middleware/auth.js";

import {
  getStudentExams,
  startExam,
  submitExam,
  getExamResult
} from "../Controllers/studentExamController.js";
import { getResultValidator, startExamValidator, submitExamValidator } from "../../middleware/studentExamValidator.js";

router
  .get("/", authRequired, getStudentExams)
  .get("/:examId/start", authRequired ,startExamValidator, startExam)
  .post("/:attemptId/submit", StudentAuth,submitExamValidator, submitExam)
  .get("/result/:examId", StudentAuth,getResultValidator, getExamResult);

export default router;