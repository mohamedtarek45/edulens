import Exam from "../models/Exam.js";
import Question from "../models/Question.js";
import ExcelJS from "exceljs";
import StudentExam from "../models/studentExam.js";
import User from "../models/user.js";

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const createExam = async (req, res) => {
  try {
    const { title, questionIds } = req.body;

    const questions = await Question.find({
      _id: { $in: questionIds },
    });

    const forms = [];

    const formNames = ["A", "B", "C", "D"];

    for (let i = 0; i < 4; i++) {
      const shuffledQuestions = shuffle([...questions]);

      const formatted = shuffledQuestions.map((q) => {
        let options = shuffle([...q.options]);

        return {
          questionId: q._id,
          question: q.question,
          image: q.image,
          options,
          correctAnswer: q.correctAnswer,
        };
      });

      forms.push({
        formId: formNames[i],
        questions: formatted,
      });
    }

    const exam = await Exam.create({
      title,
      questions: questionIds,
      forms,
    });

    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getExamById = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await Exam.findById(id);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
export const deleteExam = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await Exam.findByIdAndDelete(id);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getExamResult = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId);
    if (!exam) {
      console.log("exam not found");
      return res.status(404).json({ message: "Exam not found" });
    }
    const attempts = await StudentExam.find({ exam: examId }).populate(
      "student",
    );
    const users = await User.find({ role: "student" });
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Results");

    sheet.columns = [
      { header: "Student Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Score", key: "score", width: 10 },
      { header: "Duration (sec)", key: "duration", width: 15 },
      { header: "Status", key: "status", width: 15 },
    ];

    attempts.forEach((a) => {
      sheet.addRow({
        name: a.student.name,
        email: a.student.email,
        score: a.score,
        duration: a.duration,
        status: a.status,
      });
    });
    const attemptEmails = new Set(attempts.map((a) => a.student.email));
    users.forEach((u) => {
      if (!attemptEmails.has(u.email)) {
        sheet.addRow({
          name: u.name,
          email: u.email,
          score: 0,
          duration: 0,
          status: "not_started",
        });
      }
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=exam-results.xlsx`,
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
