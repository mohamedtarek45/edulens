import { useParams } from "react-router-dom";
import { useState } from "react";
import { useStartExam, useSubmitExam } from "../hooks/StudentExamHook";
import QuestionCard from "../components/QuestionCard.jsx";
import { useNavigate } from "react-router-dom";
import ExamError from "../components/ExamError";
import { Loader2, SendHorizonal } from "lucide-react";
import toast from "react-hot-toast";

const StartExamPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: submitExam, isPending: isSubmitting } = useSubmitExam();
  const { examId } = useParams();
  const { data, isLoading, isPending, isFetching, isError, error } =
    useStartExam(examId);

  const [answers, setAnswers] = useState({});
  console.log(data);
  const handleSubmit = async () => {
    try {
      await submitExam({ attemptId: data.attemptId, answers });
      navigate(`/home`);
    } catch (err) {
      console.log(err);
      toast.error("Error submitting exam");
    }
  };

  if (isLoading || isPending || isFetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-slate-400 text-base tracking-widest uppercase">
          Loading exam...
        </p>
      </div>
    );
  }

  if (isError) return <ExamError message={error.message} />;

  const { form } = data;
  const answeredCount = Object.keys(answers).length;
  const totalCount = form.questions.length;
  const progress = Math.round((answeredCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-10 bg-white border-b-2 border-slate-100 shadow-sm px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              Form {form.formId}
            </h1>
            <p className="text-slate-400 text-base">
              {answeredCount} / {totalCount} answered
            </p>
          </div>

          <div className="flex-1 max-w-xs">
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div
                className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-right text-slate-400 text-sm mt-1">
              {progress}%
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-5 pb-28">
        {form.questions.map((q, i) => (
          <QuestionCard
            key={q.questionId}
            question={q}
            index={i}
            answers={answers}
            setAnswers={setAnswers}
          />
        ))}
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-base px-6 py-3.5 rounded-2xl shadow-xl transition-all"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <SendHorizonal className="w-5 h-5" />
          )}
          {isSubmitting ? "Submitting..." : "Submit Exam"}
        </button>
      </div>
    </div>
  );
};

export default StartExamPage;
