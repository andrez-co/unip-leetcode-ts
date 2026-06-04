import Congratulations from '../components/Congratulations';
import Question from '../components/Question';
import { useCountryQuiz } from '../hooks/useCountryQuiz';

function Quiz() {
  const quiz = useCountryQuiz();

  if (quiz.status === 'loading') {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/80 p-8 text-center shadow-2xl shadow-stone-900/10 backdrop-blur dark:border-stone-700 dark:bg-stone-900/80">
        <div className="mx-auto size-16 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600 dark:border-stone-700 dark:border-t-emerald-300" />
        <p className="mt-6 text-lg font-black" role="status">
          Cargando preguntas...
        </p>
      </section>
    );
  }

  if (quiz.status === 'error') {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-red-200 bg-white/85 p-8 shadow-2xl shadow-red-950/10 dark:border-red-900 dark:bg-stone-900/85">
        <h2 className="text-3xl font-black">No se pudo cargar el quiz</h2>
        <p className="mt-3 text-red-700 dark:text-red-300" role="alert">
          {quiz.error}
        </p>
        <button
          className="mt-6 rounded-full bg-emerald-600 px-5 py-3 font-black text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-700"
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

  const answeredCount = quiz.answers.length;
  const progress = Math.round((answeredCount / quiz.questions.length) * 100);

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_18rem]">
      <div className="space-y-6 rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-2xl shadow-stone-900/10 backdrop-blur dark:border-stone-700 dark:bg-stone-900/85 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              Pregunta {quiz.currentQuestionIndex + 1} de {quiz.questions.length}
            </p>
            <p className="mt-2 text-sm font-semibold text-stone-500 dark:text-stone-400">
              {answeredCount} respondidas
            </p>
          </div>
          <p
            aria-live="polite"
            className={`rounded-full px-4 py-2 text-sm font-black ${
              quiz.secondsLeft <= 5
                ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-200'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-100'
            }`}
          >
            {quiz.secondsLeft}s
          </p>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Question
          answer={quiz.currentAnswer}
          onAnswer={quiz.answerQuestion}
          question={quiz.currentQuestion}
        />

        {quiz.currentAnswer?.timedOut ? (
          <p
            className="rounded-2xl bg-red-100 px-4 py-3 font-semibold text-red-800 dark:bg-red-950 dark:text-red-200"
            role="alert"
          >
            Tiempo agotado. La respuesta se marco como incorrecta.
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="rounded-full border border-stone-300 bg-white px-5 py-3 font-black text-stone-700 transition hover:border-stone-500 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200"
            disabled={quiz.currentQuestionIndex === 0}
            onClick={quiz.previousQuestion}
            type="button"
          >
            Anterior
          </button>
          <button
            className="rounded-full border border-stone-300 bg-white px-5 py-3 font-black text-stone-700 transition hover:border-stone-500 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200"
            disabled={quiz.currentQuestionIndex === quiz.questions.length - 1}
            onClick={quiz.nextQuestion}
            type="button"
          >
            Siguiente
          </button>
          <button
            className="rounded-full bg-emerald-600 px-5 py-3 font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!quiz.allAnswered}
            onClick={quiz.finishQuiz}
            type="button"
          >
            Finalizar
          </button>
        </div>
      </div>

      <nav
        aria-label="Navegar entre preguntas"
        className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-2xl shadow-stone-900/10 backdrop-blur dark:border-stone-700 dark:bg-stone-900/80"
      >
        <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          Mapa
        </p>
        <div className="grid grid-cols-5 gap-2 lg:grid-cols-2">
          {quiz.questions.map((question, index) => {
            const isCurrent = index === quiz.currentQuestionIndex;
            const answer = quiz.answers.find((userAnswer) => userAnswer.questionId === question.id);

            return (
              <button
                aria-current={isCurrent ? 'step' : undefined}
                className={`size-11 rounded-2xl border text-sm font-black transition ${
                  isCurrent
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                    : answer?.isCorrect
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-100'
                      : answer
                        ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-100'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-emerald-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200'
                }`}
                key={question.id}
                onClick={() => quiz.goToQuestion(index)}
                type="button"
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </nav>
    </section>
  );
}

export default Quiz;
