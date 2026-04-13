import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ExamForm from "../components/ExamForm.jsx";

const CreateExamPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-1 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/dashboard/exams")}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold">Create Exam</h1>
      </div>

      <ExamForm />
    </div>
  );
};

export default CreateExamPage;