type CongratulationsProps = {
  correctAnswers: number;
  totalQuestions: number;
  onPlayAgain: () => void;
};

function Congratulations({ correctAnswers, totalQuestions, onPlayAgain }: CongratulationsProps) {
  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-3xl font-bold">Quiz finalizado</h2>
      <p className="text-lg text-slate-700 dark:text-slate-200">
        Resultado: {correctAnswers} de {totalQuestions} respuestas correctas.
      </p>
      <button
        className="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700"
        onClick={onPlayAgain}
        type="button"
      >
        Jugar de nuevo
      </button>
    </section>
  );
}

export default Congratulations;
