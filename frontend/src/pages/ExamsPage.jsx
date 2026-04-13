import { useNavigate } from "react-router-dom";

import ExamsList from "../components/ExamsList";

const ExamsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 py-3">
        <h1 className="text-2xl font-bold">Exams</h1>

        <button
          onClick={() => navigate("/dashboard/exams/create")}
          className="bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Exam
        </button>
      </div>

      <ExamsList />
    </div>
  );
};

export default ExamsPage;
