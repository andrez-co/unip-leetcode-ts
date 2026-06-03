import type { QuizQuestion, UserAnswer } from '../types/quiz';

type QuestionProps = {
  question: QuizQuestion;
  answer?: UserAnswer;
  onAnswer: (optionId: string) => void;
};

function Question({ question, answer, onAnswer }: QuestionProps) {
  return (
    <article className="space-y-4">
      <h2 className="text-2xl font-bold">{question.prompt}</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          const isSelected = answer?.selectedOptionId === option.id;
          const isCorrect = option.id === question.correctOptionId;
          const shouldShowCorrect = Boolean(answer) && isCorrect;
          const shouldShowWrong = Boolean(answer) && isSelected && !isCorrect;
          const feedbackClass = shouldShowCorrect
            ? 'border-emerald-500 bg-emerald-100 text-emerald-900 dark:border-emerald-400 dark:bg-emerald-950 dark:text-emerald-100'
            : shouldShowWrong
              ? 'border-red-500 bg-red-100 text-red-900 dark:border-red-400 dark:bg-red-950 dark:text-red-100'
              : 'border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100';

          return (
            <button
              className={`rounded-lg border px-4 py-3 text-left disabled:cursor-not-allowed ${feedbackClass}`}
              data-correct={shouldShowCorrect}
              data-wrong={shouldShowWrong}
              disabled={Boolean(answer)}
              key={option.id}
              onClick={() => onAnswer(option.id)}
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </article>
  );
}

export default Question;
