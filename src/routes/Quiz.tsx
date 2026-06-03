import Congratulations from '../components/Congratulations';
import Question from '../components/Question';
import { useCountryQuiz } from '../hooks/useCountryQuiz';

function Quiz() {
  const quiz = useCountryQuiz();

  if (quiz.status === 'loading') {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p role="status">Cargando preguntas...</p>
      </section>
    );
  }

  if (quiz.status === 'error') {
    return (
      <section className="rounded-lg border border-red-200 bg-white p-8 shadow-sm dark:border-red-800 dark:bg-slate-900">
        <h2 className="text-2xl font-bold">No se pudo cargar el quiz</h2>
        <p className="mt-3 text-red-700 dark:text-red-300" role="alert">
          {quiz.error}
        </p>
        <button
          className="mt-5 rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700"
          onClick={quiz.playAgain}
          type="button"
        >
          Reintentar
        </button>
      </section>
    );
  }

  if (quiz.status === 'finished') {
    return (
      <Congratulations
        correctAnswers={quiz.score}
        onPlayAgain={quiz.playAgain}
        totalQuestions={quiz.questions.length}
      />
    );
  }

  if (!quiz.currentQuestion) {
    return null;
  }

  return (
    <section className="space-y-6 rounded-lg border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-semibold">
          Pregunta {quiz.currentQuestionIndex + 1} de {quiz.questions.length}
        </p>
        <p aria-live="polite" className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">
          Tiempo: {quiz.secondsLeft}s
        </p>
      </div>

      <Question
        answer={quiz.currentAnswer}
        onAnswer={quiz.answerQuestion}
        question={quiz.currentQuestion}
      />

      {quiz.currentAnswer?.timedOut ? (
        <p className="text-red-700 dark:text-red-300" role="alert">
          Tiempo agotado. La respuesta se marco como incorrecta.
        </p>
      ) : null}

      <nav aria-label="Navegar entre preguntas" className="flex flex-wrap gap-2">
        {quiz.questions.map((question, index) => {
          const isCurrent = index === quiz.currentQuestionIndex;
          const isAnswered = quiz.answers.some((answer) => answer.questionId === question.id);

          return (
            <button
              aria-current={isCurrent ? 'step' : undefined}
              className={`size-10 rounded-lg border text-sm font-semibold ${
                isCurrent
                  ? 'border-sky-600 bg-sky-600 text-white'
                  : isAnswered
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-100'
                    : 'border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200'
              }`}
              key={question.id}
              onClick={() => quiz.goToQuestion(index)}
              type="button"
            >
              {index + 1}
            </button>
          );
        })}
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <button
          className="rounded-lg border border-slate-300 px-4 py-2 font-semibold disabled:opacity-50 dark:border-slate-700"
          disabled={quiz.currentQuestionIndex === 0}
          onClick={quiz.previousQuestion}
          type="button"
        >
          Anterior
        </button>
        <button
          className="rounded-lg border border-slate-300 px-4 py-2 font-semibold disabled:opacity-50 dark:border-slate-700"
          disabled={quiz.currentQuestionIndex === quiz.questions.length - 1}
          onClick={quiz.nextQuestion}
          type="button"
        >
          Siguiente
        </button>
        <button
          className="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
          disabled={!quiz.allAnswered}
          onClick={quiz.finishQuiz}
          type="button"
        >
          Finalizar
        </button>
      </div>
    </section>
  );
}

export default Quiz;
