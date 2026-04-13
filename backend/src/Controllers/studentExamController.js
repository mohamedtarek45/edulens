import Exam from "../models/Exam.js";
import User from "../models/user.js";
import StudentExam from "../models/studentExam.js";
import { redis } from "../../config/redis.js";

export const getExamResult = async (req, res) => {
  try {
    const studentemail = req.user.email;
    const student = await User.findOne({ email: studentemail });

    const { examId } = req.params;

    const attempt = await StudentExam.findOne({
      student: student._id,
      exam: examId,
    }).populate("exam");

    if (!attempt) {
      return res.status(404).json({
        message: "No attempt found for this exam",
      });
    }

    // ❌ لو لسه مش submitted
    if (attempt.status !== "submitted") {
      return res.status(400).json({
        message: "Exam not submitted yet",
      });
    }

    const form = attempt.exam.forms.find(
      (f) => f.formId === attempt.formId
    );

    const resultQuestions = form.questions.map((q) => {
      const userAnswerObj = attempt.answers.find(
        (a) => a.questionId === q.questionId
      );

      return {
        questionId: q.questionId,
        question: q.question,
        image: q.image,
        options: q.options,
        correctAnswer: q.correctAnswer,
        userAnswer: userAnswerObj?.answer || null,
      };
    });

    return res.json({
      examTitle: attempt.exam.title,
      score: attempt.score,
      duration: attempt.duration,
      total: form.questions.length,
      questions: resultQuestions,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};


export const getStudentExams = async (req, res) => {
  try {
    const studentemail = req.user.email;
    const student = await User.findOne({ email: studentemail });
    const exams = await Exam.find();

    const attempts = await StudentExam.find({
      student: student._id,
    });

    const result = exams.map((exam) => {
      const attempt = attempts.find(
        (a) => a.exam.toString() === exam._id.toString(),
      );

      return {
        _id: exam._id,
        title: exam.title,
        questionsCount: exam.questions.length,
        status: attempt ? attempt.status : "not_started",
        score: attempt ? attempt.score : null,
        duration: attempt ? attempt.duration : null,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const startExam = async (req, res) => {
  try {
    const studentemail = req.user.email;
    const student = await User.findOne({ email: studentemail });
    const studentId = student._id;

    const { examId } = req.params;
    const redisKey = `${studentId}:${examId}`;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const session = await redis.get(redisKey);

    let form;
    let startTime;

    if (session) {

      const data = session;
      form = exam.forms.find((f) => f.formId === data.formId);
      startTime = data.startTime;
      if (!form || startTime === null) {
        return res.status(400).json({ message: "Form not found" });
      }
    } else {
      const randomIndex = Math.floor(Math.random() * exam.forms.length);
      form = exam.forms[randomIndex];
      startTime = Date.now();

      await redis.set(
        redisKey,
        JSON.stringify({
          formId: form.formId,
          startTime,
        }),
        { ex: 2 * 60 * 60 },
      );
    }


    let attempt = await StudentExam.findOne({
      student: studentId,
      exam: examId,
    });

    if (!attempt) {

      attempt = await StudentExam.create({
        student: studentId,
        exam: examId,
        formId: form.formId,
        startTime: startTime,
        status: "started",
      });
    }

    return res.json({
      attemptId: attempt._id,
      form,
      startTime,
      endTime: new Date(startTime + 2 * 60 * 60 * 1000),

      answers: attempt.answers || [],
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const submitExam = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { answers } = req.body;
    const attempt = await StudentExam.findById(attemptId).populate("exam");

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    const redisKey = `${attempt.student}:${attempt.exam._id}`;
    const session = await redis.get(redisKey);

    let sessionData = null;
    let isExpired = false;

    const TIME_LIMIT = 2 * 60 * 60 * 1000;
    if (session) {
      sessionData = session;
      isExpired = Date.now() > sessionData.startTime + TIME_LIMIT;
    } else {
      isExpired = true;
    }

    const form = attempt.exam.forms.find(
      (f) => f.formId === sessionData?.formId,
    );

    if (!form) {
      return res.status(400).json({
        message: "Exam session not found",
      });
    }

    let score = 0;
    let duration = 0;

    if (!isExpired) {
      form.questions.forEach((q) => {
        const userAnswer = answers[q.questionId];

        if (userAnswer === q.correctAnswer) {
          score++;
        }
      });

      duration = Math.floor((Date.now() - sessionData.startTime) / 1000);
    } else {
      score = 0;
      duration = TIME_LIMIT / 1000;
    }

    attempt.answers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));

    attempt.score = score;
    attempt.endTime = new Date();
    attempt.duration = duration;
    attempt.status = "submitted";

    await attempt.save();
    await redis.del(redisKey);

    return res.json({
      score,
      duration,
      total: form.questions.length,
      expired: isExpired,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
