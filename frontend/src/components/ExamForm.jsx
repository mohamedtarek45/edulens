import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetAllQuestions } from "../hooks/QuestionHook";
import { useCreateExam } from "../hooks/ExamsHook";
import { useState } from "react";
import {
  FileText,
  CheckSquare,
  Square,
  AlertCircle,
  Plus,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const ExamForm = () => {
  const { data: questions, isLoading } = useGetAllQuestions();
  const { mutateAsync: createExam, isPending: isCreating } = useCreateExam();

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const toggleQuestion = (id) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const formik = useFormik({
    initialValues: { title: "" },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: async (values) => {
      if (selectedQuestions.length === 0) {
        toast.error("Select at least one question");
        return;
      }
      await createExam({ title: values.title, questionIds: selectedQuestions });
    },
  });

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-slate-400 text-sm tracking-widest uppercase">
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Create Exam</h1>
          <p className="text-slate-400 text-sm">Fill in the details and pick your questions</p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">

        {/* Title Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Exam Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Midterm Biology Exam"
            value={formik.values.title}
            onChange={formik.handleChange}
            className={`w-full bg-white text-slate-800 placeholder-slate-300 rounded-xl px-4 py-3 text-xl outline-none border-2 transition-all duration-200 focus:ring-4 focus:ring-indigo-100 ${
              formik.errors.title && formik.touched.title
                ? "border-red-400 focus:border-red-400"
                : "border-slate-200 focus:border-indigo-400"
            }`}
          />
          {formik.errors.title && formik.touched.title && (
            <p className="flex items-center gap-1.5 text-red-500 text-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              {formik.errors.title}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Select Questions
            </label>
            {selectedQuestions.length > 0 && (
              <span className=" font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                {selectedQuestions.length} selected
              </span>
            )}
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto rounded-xl border-2 border-slate-100 bg-slate-50 p-3">
            {questions?.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm">
                No questions available.
              </div>
            )}
            {questions?.map((q, index) => {
              const isSelected = selectedQuestions.includes(q._id);
              return (
                <div
                  key={q._id}
                  onClick={() => toggleQuestion(q._id)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-150 bg-white ${
                    isSelected
                      ? "border-indigo-400 bg-indigo-50"
                      : "border-transparent hover:border-slate-200"
                  }`}
                >
                  {isSelected ? (
                    <CheckSquare className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                  )}
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="shrink-0 text-sm font-mono text-slate-600 mt-0.5">
                        Q{String(index + 1)}
                    </span>
                    <p className={` leading-snug transition-colors ${
                      isSelected ? "text-indigo-700 font-medium" : "text-slate-600"
                    }`}>
                      {q.question}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

   
        <button
          type="submit"
          disabled={isCreating}
          className="w-full hover:cursor-pointer flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md shadow-indigo-200 hover:shadow-indigo-300 active:scale-[0.98]"
        >
          {isCreating ? (
            <>
              <Loader2 className="size-5 animate-spin" />
            
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Create Exam
            </>
          )}
        </button>

      </form>
    </div>
  );
};

export default ExamForm;