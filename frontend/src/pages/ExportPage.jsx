import { useGetAllExams } from "../hooks/ExamsHook";
import ExamExportCard from "../components/ExamExportCard";

const ExportPage = () => {
  const { data, isLoading, isError, error } = useGetAllExams();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading exams...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Export Exam Results
        </h1>

        <div className="space-y-4">
          {data?.map((exam) => (
            <ExamExportCard key={exam._id} exam={exam} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportPage;