import { useGetAllExams } from "../hooks/ExamsHook";
import { useNavigate } from "react-router-dom";
import { useDeleteExam } from "../hooks/ExamsHook";
import {
  BookOpen,
  Trash2,
  Eye,
  Calendar,
  FileQuestion,
  Loader2,
  AlertCircle,
  ClipboardList,
} from "lucide-react";
import Swal from "sweetalert2";
import PageLoader from "./PageLoader";
const ExamsList = () => {
  const navigate = useNavigate();
  const { mutateAsync: deleteExam, isPending: isDeleting } = useDeleteExam();
  const { data: exams, isPending, isError, error } = useGetAllExams();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this exam?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteExam(id);
      } catch (error) {
        console.log(error);
        Swal.fire("Error!", "Something went wrong", "error");
      }
    }
  };
  if (isPending) {
    return (
      <PageLoader />
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-red-500 text-base font-medium">
          {error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  if (!exams || exams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <ClipboardList className="w-12 h-12 text-slate-300" />
        <p className="text-slate-400 text-lg font-medium">No exams yet</p>
        <p className="text-slate-300 text-base">
          Create your first exam to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {exams.map((exam) => (
        <div
          key={exam._id}
          className="bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-200 flex flex-col gap-4"
        >
          {/* Top */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-indigo-500" />
            </div>
            <h2 className="text-base font-semibold text-slate-800 leading-snug pt-1">
              {exam.title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <FileQuestion className="w-4 h-4 text-slate-400" />
              <span>{exam.questions?.length || 0} Questions</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Calendar className="w-4 h-4 text-slate-300" />
              <span>{new Date(exam.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="border-t border-slate-100" />

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/dashboard/exams/${exam._id}`)}
              className="hover:cursor-pointer flex items-center gap-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors duration-150"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
            <button
              disabled={isDeleting}
              onClick={() => handleDelete(exam._id)}
              className=" hover:cursor-pointer  flex items-center gap-1.5 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors duration-150"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? (
                <div className="size-5 border-b rounded-full border-red-500 animate-spin mx-2" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamsList;
