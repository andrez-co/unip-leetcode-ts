import { useEffect, useState } from 'react';

const HIGH_SCORE_KEY = 'country-quiz-high-score';

type CongratulationsProps = {
  correctAnswers: number;
  totalQuestions: number;
  onPlayAgain: () => void;
};

function Congratulations({ correctAnswers, totalQuestions, onPlayAgain }: CongratulationsProps) {
  const [highScore, setHighScore] = useState(correctAnswers);
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  useEffect(() => {
    const storedScore = Number(window.localStorage.getItem(HIGH_SCORE_KEY) ?? 0);
    const nextHighScore = Math.max(storedScore, correctAnswers);

    window.localStorage.setItem(HIGH_SCORE_KEY, String(nextHighScore));
    setHighScore(nextHighScore);
  }, [correctAnswers]);

  return (
    <section className="mx-auto grid max-w-4xl gap-6 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl shadow-stone-900/10 backdrop-blur dark:border-stone-700 dark:bg-stone-900/85 sm:p-8 lg:grid-cols-[0.8fr_1fr] lg:items-center">
      <div
        aria-label={`${percentage}% de respuestas correctas`}
        className="mx-auto grid size-56 place-items-center rounded-full shadow-2xl shadow-emerald-900/10"
        style={{
          background: `conic-gradient(#059669 ${percentage * 3.6}deg, rgba(120,113,108,0.22) 0deg)`,
        }}
      >
        <div className="grid size-40 place-items-center rounded-full bg-white text-center dark:bg-stone-950">
          <div>
            <p className="text-5xl font-black text-emerald-700 dark:text-emerald-300">
              {correctAnswers}
            </p>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-stone-500">
              de {totalQuestions}
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
          Resultado
        </p>
        <h2 className="mt-3 text-4xl font-black leading-tight text-stone-950 dark:text-white">
          Quiz finalizado
        </h2>
        <p className="mt-4 text-lg leading-8 text-stone-700 dark:text-stone-200">
          Obtuviste {correctAnswers} respuestas correctas de {totalQuestions}. Tu mejor puntaje
          guardado es {highScore}.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-950">
            <p className="text-sm font-bold text-stone-500 dark:text-stone-400">Precision</p>
            <p className="mt-1 text-2xl font-black">{percentage}%</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-950">
            <p className="text-sm font-bold text-stone-500 dark:text-stone-400">High score</p>
            <p className="mt-1 text-2xl font-black">{highScore}</p>
          </div>
        </div>

        <button
          className="mt-8 rounded-full bg-emerald-600 px-6 py-3 font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700"
          onClick={onPlayAgain}
          type="button"
        >
          Jugar de nuevo
        </button>
      </div>
    </section>
  );
}

export default Congratulations;
