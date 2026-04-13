const QuestionCard = ({ question, index, answers, setAnswers }) => {
  const handleSelect = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [question.questionId]: option,
    }));
  };

  const selected = answers[question.questionId];

  return (
    <div className={`bg-white rounded-2xl border-2 p-5 transition-all duration-200 ${
      selected ? "border-indigo-200 shadow-md shadow-indigo-50" : "border-slate-100 shadow-sm"
    }`}>

      {/* Question Header */}
      <div className="flex items-start gap-3 mb-4">
        <span className="shrink-0 w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-base font-bold text-indigo-500">
          {index + 1}
        </span>
        <h3 className="text-base font-semibold text-slate-800 pt-1 leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Image */}
      {question.image && (
        <div className="mb-4 pl-11">
          <img
            src={question.image}
            alt="question"
            className="w-full max-h-64 object-contain rounded-xl border-2 border-slate-100"
          />
        </div>
      )}

  
      <div className="space-y-2.5 pl-11">
        {question.options.map((opt, i) => {
          const isSelected = selected === opt;
          return (
            <label
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                isSelected
                  ? "bg-indigo-50 border-indigo-400 text-indigo-700"
                  : "bg-slate-50 border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/40"
              }`}
            >
     
              <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                isSelected ? "border-indigo-500 bg-indigo-500" : "border-slate-300"
              }`}>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>

              <input
                type="radio"
                name={question.questionId}
                checked={isSelected}
                onChange={() => handleSelect(opt)}
                className="hidden"
              />

              <span className="text-base font-medium">{opt}</span>
            </label>
          );
        })}
      </div>

    </div>
  );
};

export default QuestionCard;