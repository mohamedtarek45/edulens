import mongoose from "mongoose";

const studentExamSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    formId: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required: true,
    },

    answers: [
      {
        questionId: String,
        answer: String,
      },
    ],

    score: {
      type: Number,
      default: 0,
    },

    startTime: Date,
    endTime: Date,

    duration: Number, // seconds

    status: {
      type: String,
      enum: ["started", "submitted"],
      default: "started",
    },
  },
  { timestamps: true }
);


studentExamSchema.index({ student: 1, exam: 1 }, { unique: true });

const StudentExam =
  mongoose.models.StudentExam ||
  mongoose.model("StudentExam", studentExamSchema);

export default StudentExam;