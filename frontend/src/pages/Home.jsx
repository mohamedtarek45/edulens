import { useStudentExams } from "../hooks/StudentExamHook";
import ExamCard from "../components/ExamCard";
import useUserStore from "../store/userStore";
import { AlertCircle, GraduationCap, ClipboardList } from "lucide-react";
import PageLoader from "../components/PageLoader";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { data, isPending, isError, error } = useStudentExams();

  if (isPending) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-red-500 text-base font-medium">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="bg-linear-to-br from-indigo-600 to-indigo-500 px-8 py-10">
        <div className="flex items-center gap-4 mb-1">
          <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">My Exams</h1>
            <p className="text-indigo-200 text-base">
              {user.role === "student" ? (
                <p>
                  {data.length} exam{data.length !== 1 ? "s" : ""} assigned to
                  you
                </p>
              ) : (
                <p>
                  {data.length} exam{data.length !== 1 ? "s" : ""} created
                </p>
              )}
            </p>
          </div>
        </div>

        {user.role === "teacher" && (
          <button
            onClick={() => navigate(`/dashboard`)}
            className="mt-3 hover:cursor-pointer ml-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-sm font-medium shadow-md hover:opacity-90 transition active:scale-95"
          >
            Go to Das hboard
          </button>
        )}
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
              <ClipboardList className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 text-lg font-semibold">No exams yet</p>
            <p className="text-slate-400 text-base">
              Check back later for assigned exams
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((exam) => (
              <ExamCard key={exam._id} exam={exam} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
