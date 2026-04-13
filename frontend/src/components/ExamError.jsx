import { AlertTriangle, ArrowLeft, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExamError = ({ message }) => {
  const navigate = useNavigate();

  const isAlreadyStarted = message === "Exam already started";

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white shadow-lg border rounded-2xl p-8 max-w-md w-full text-center space-y-4">

        {/* ICON */}
        <div className="flex justify-center">
          <div className="bg-yellow-100 p-4 rounded-full">
            <AlertTriangle className="text-yellow-600 w-10 h-10" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-slate-800">
          Oops!
        </h2>

        {/* MESSAGE */}
        <p className="text-slate-600">
          {isAlreadyStarted
            ? "You already started this exam."
            : message || "Something went wrong"}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-3 justify-center pt-4">

          {isAlreadyStarted && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          )}

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <RefreshCcw className="w-4 h-4" />
            Retry
          </button>
        </div>

      </div>
    </div>
  );
};

export default ExamError;