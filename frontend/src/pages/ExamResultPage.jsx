import { useParams, useNavigate } from "react-router-dom";
import { useExamResult } from "../hooks/StudentExamHook";
import { Loader2, AlertCircle, CheckCircle2, XCircle, Circle, Trophy, ArrowLeft } from "lucide-react";

const ExamResultPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useExamResult(examId);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
        <p className="text-slate-400 text-base tracking-widest uppercase">Loading result...</p>
      </div>
    );
  }

  if (isError) {
    if (error.message === "Exam not submitted yet") navigate("/home");
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-red-500 text-base font-medium">{error.message}</p>
      </div>
    );
  }

  const percentage = Math.round((data.score / data.total) * 100);
  const isPassing = percentage >= 50;

  return (
    <div className="min-h-screen w-full bg-slate-50">


      <div className={`px-8 py-10 ${isPassing ? "bg-linear-to-br from-indigo-600 to-indigo-500" : "bg-linear-to-br from-rose-500 to-rose-400"}`}>
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-white/70 hover:text-white text-base mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to exams
        </button>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{data.examTitle}</h1>
            <p className="text-white/70 text-base">Exam Result</p>
          </div>
        </div>

        <div className="mt-6 bg-white/15 rounded-2xl px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-base mb-1">Your Score</p>
            <p className="text-4xl font-bold text-white">{data.score} <span className="text-xl font-medium text-white/60">/ {data.total}</span></p>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-base mb-1">Percentage</p>
            <p className="text-4xl font-bold text-white">{percentage}%</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-5">
        {data.questions.map((q, i) => {
          const isCorrect = q.userAnswer === q.correctAnswer;

          return (
            <div
              key={i}
              className={`bg-white rounded-2xl border-2 p-5 space-y-4 ${
                isCorrect ? "border-green-200" : "border-rose-200"
              }`}
            >
 
              <div className="flex items-start gap-3">
                <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-base font-bold ${
                  isCorrect ? "bg-green-50 text-green-600" : "bg-rose-50 text-rose-500"
                }`}>
                  {i + 1}
                </span>
                <p className="text-base font-semibold text-slate-800 pt-1 leading-snug">{q.question}</p>
              </div>

     
              {q.image && (
                <div className="pl-11">
                  <img
                    src={q.image}
                    alt="question"
                    className="w-full max-h-64 object-contain rounded-xl border-2 border-slate-100"
                  />
                </div>
              )}

              {/* Options */}
              <div className="space-y-2.5 pl-11">
                {q.options.map((opt, idx) => {
                  const isUser = opt === q.userAnswer;
                  const isRight = opt === q.correctAnswer;

                  let style = "bg-slate-50 border-slate-100 text-slate-500";
                  if (isRight) style = "bg-green-50 border-green-300 text-green-700";
                  else if (isUser && !isRight) style = "bg-rose-50 border-rose-300 text-rose-600";

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${style}`}
                    >
                      {isRight ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      ) : isUser ? (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                      )}
                      <span className="text-base font-medium">{opt}</span>
                      {isRight && !isUser && (
                        <span className="ml-auto text-green-600 text-sm font-semibold">Correct answer</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ExamResultPage;