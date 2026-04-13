import { useParams, useNavigate } from "react-router-dom";
import { useGetExamById } from "../hooks/ExamsHook";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

const ExamDetailsPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const { data: exam, isLoading, isError } = useGetExamById(examId);
  const [activeForm, setActiveForm] = useState(0);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-slate-400 text-base tracking-widest uppercase">Loading exam...</p>
      </div>
    );
  }

  if (isError || !exam) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-red-500 text-base font-medium">Failed to load exam</p>
      </div>
    );
  }

  const currentForm = exam.forms?.[activeForm];

  return (
    <div className="w-full p-6 space-y-6">


      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/exams")}
          className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{exam.title}</h1>
          <p className="text-slate-400 text-base">{exam.forms?.length} form{exam.forms?.length !== 1 ? "s" : ""}</p>
        </div>
      </div>


      <div className="flex flex-wrap gap-2 border-b-2 border-slate-100 pb-4">
        {exam.forms.map((form, index) => (
          <button
            key={form.formId}
            onClick={() => setActiveForm(index)}
            className={`px-5 py-2 rounded-xl text-base font-semibold transition-all duration-150 cursor-pointer ${
              activeForm === index
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
          >
            Form {form.formId}
          </button>
        ))}
      </div>


      <div className="space-y-4">
        {currentForm?.questions.map((q, i) => (
          <div
            key={i}
            className="bg-white border-2 border-slate-100 rounded-2xl p-5 space-y-4 hover:border-indigo-100 transition-all duration-150"
          >
            {/* Question */}
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-base font-bold text-indigo-500">
                {i + 1}
              </span>
              <p className="text-base font-semibold text-slate-800 pt-1">{q.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-2 pl-11">
              {q.options.map((opt, idx) => {
                const isCorrect = opt === q.correctAnswer;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all ${
                      isCorrect
                        ? "bg-green-50 border-green-300 text-green-700"
                        : "bg-slate-50 border-slate-100 text-slate-500"
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                    )}
                    <span className={`text-base font-medium ${isCorrect ? "text-green-700" : "text-slate-500"}`}>
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ExamDetailsPage;