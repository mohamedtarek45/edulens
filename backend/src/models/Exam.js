import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: String,

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    forms: [
      {
        formId: { type: String, required: true, enum: ["A", "B", "C", "D"] },
        questions: [
          {
            questionId: String,
            question: String,
            image: String, 
            options: [String],
            correctAnswer: String,
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);
export default Exam;
