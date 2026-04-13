import { Download } from "lucide-react";
import { useExportExam } from "../hooks/ExamsHook";

const ExamExportCard = ({ exam }) => {
  const { mutateAsync, isPending } = useExportExam();

  const handleExport = async () => {
    await mutateAsync({examId: exam._id, examTitle: exam.title});
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between">
      {/* INFO */}
      <div>
        <h2 className="font-semibold text-lg">{exam.title}</h2>

        <p className="text-sm text-gray-500">
          Questions: {exam.questions.length}
        </p>
      </div>

      <button
        onClick={handleExport}
        disabled={isPending}
        className="flex cursor-pointer items-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl transition"
      >
        <Download size={16} />
        {isPending ? "Exporting..." : "Export"}
      </button>
    </div>
  );
};

export default ExamExportCard;
