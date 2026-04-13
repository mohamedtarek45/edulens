import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle } from "lucide-react";
import useUserStore from "../store/userStore";
const ExamCard = ({ exam }) => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const handleAction = () => {
    if (exam.status === "submitted") {
      navigate(`/home/exam/result/${exam._id}`);
    } else {
      navigate(`/home/exam/${exam._id}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition flex flex-col gap-3">
      {/* Title */}
      <h2 className="text-lg font-semibold">{exam.title}</h2>

      {/* Questions */}
      <p className="text-sm text-gray-500">{exam.questionsCount} Questions</p>

      {user.role === "student" && (
        <>
          <div className="flex items-center gap-2">
            {exam.status === "submitted" && (
              <span className="flex items-center gap-1 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                Submitted
              </span>
            )}

            {exam.status === "started" && (
              <span className="text-yellow-500 text-sm">In Progress</span>
            )}

            {exam.status === "not_started" && (
              <span className="text-gray-400 text-sm">Not Started</span>
            )}
          </div>

          {exam.status === "submitted" && (
            <div className="text-indigo-600 font-semibold">
              Score: {exam.score} / {exam.questionsCount}
            </div>
          )}

          {/* Duration */}
          {exam.duration && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {exam.duration}s
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleAction}
            className={`mt-2 px-4 py-2 rounded-xl text-sm font-medium transition
        ${
          exam.status === "submitted"
            ? "bg-green-100 text-green-700"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
          >
            {exam.status === "submitted"
              ? "View Result"
              : exam.status === "started"
                ? "Continue"
                : "Start Exam"}
          </button>
        </>
      )}
    </div>
  );
};

export default ExamCard;
