import { useState } from "react";
import Modal from "./Modal";
import QuestionForm from "./QuestionForm";
import { useDeleteQuestion, useGetAllQuestions } from "../hooks/QuestionHook";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import PageLoader from "./PageLoader";

const QuestionsList = () => {
  const queryClient = useQueryClient();
  const { data: questions, isPending, isError } = useGetAllQuestions();
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { mutateAsync: mutateDelete } = useDeleteQuestion();

  const handleEdit = (q) => {
    setSelectedQuestion(q);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this question?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await mutateDelete(id);
        queryClient.invalidateQueries({ queryKey: ["getQuestions"] });
        Swal.fire("Deleted!", "Question has been deleted", "success");
      } catch (error) {
        console.log(error);
        Swal.fire("Error!", "Something went wrong", "error");
      }
    }
  };

  if (isPending) return <PageLoader />;
  if (isError) return <div className="text-center py-20 text-red-400 text-sm">Something went wrong</div>;

  return (
    <>
      <div className="space-y-3">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">

            {/* Header: number + question + buttons */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span className="shrink-0  font-semibold text-gray-400 bg-gray-100 rounded-lg px-2 py-1 mt-0.5">
                  Q{index + 1}
                </span>
                <h2 className="text-lg font-semibold text-gray-800 leading-relaxed">
                  {q.question}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(q)}
                  className="px-3 py-1.5 font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(q._id)}
                  className="px-3 py-1.5 font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>


            {q.image && (
              <div className="mt-3 pl-9">
                <img
                  src={q.image}
                  alt="preview"
                  className="w-48 h-32 object-cover rounded-xl border border-gray-100"
                />
              </div>
            )}

            <ul className="mt-3 grid grid-cols-2 gap-2 pl-9">
              {q.options.map((opt, i) => (
                <li
                  key={i}
                  className={` px-3 py-2 rounded-lg ${
                    opt === q.correctAnswer
                      ? "bg-emerald-100 text-emerald-600 font-semibold"
                      : "bg-gray-50 text-gray-500"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <QuestionForm onClose={() => setOpen(false)} initialData={selectedQuestion} />
      </Modal>
    </>
  );
};

export default QuestionsList;