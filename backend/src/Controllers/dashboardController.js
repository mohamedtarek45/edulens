import Exam from "../models/Exam.js";
import Question from "../models/Question.js";
import User from "../models/user.js";
import StudentExam from "../models/StudentExam.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      questionsCount,
      examsCount,
      studentsCount,
      submissionsCount,
    ] = await Promise.all([
      Question.countDocuments(),
      Exam.countDocuments(),
      User.countDocuments({ role: "student" }),
      StudentExam.countDocuments(),
    ]);

    return res.json({
      questions: questionsCount,
      exams: examsCount,
      students: studentsCount,
      submissions: submissionsCount,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};