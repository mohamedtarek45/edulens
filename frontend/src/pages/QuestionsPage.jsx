import Modal from "../components/Modal";
import QuestionForm from "../components/QuestionForm";
import QuestionsList from "../components/QuestionsList";
import { useState } from "react";
const QuestionsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <QuestionForm  onClose={() => setIsOpen(false)} />
      </Modal>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Question Bank</h1>

          <button
            className="bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => setIsOpen(true)}
          >
            + Add Question
          </button>
        </div>

        <QuestionsList />
      </div>
    </>
  );
};

export default QuestionsPage;
