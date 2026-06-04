import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="grid gap-8 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.28em] text-emerald-700 dark:text-emerald-300">
          World challenge
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-black leading-tight text-stone-950 dark:text-white sm:text-6xl">
          Country Quiz
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700 dark:text-stone-200">
          Responde preguntas sobre capitales, revisa tu progreso y conserva tu mejor puntaje
          localmente.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-emerald-600 px-6 py-3 font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700"
          to="/quiz"
        >
          Empezar quiz
        </Link>
      </div>

      <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-2xl shadow-stone-900/10 dark:border-stone-700/80 dark:bg-stone-900/70">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(16,185,129,0.24),transparent_45%),radial-gradient(circle_at_80%_25%,rgba(249,115,22,0.22),transparent_28%)]" />
        <div className="relative grid h-full content-between gap-6">
          <div className="rounded-2xl bg-stone-950 p-5 text-white shadow-xl dark:bg-black">
            <p className="text-sm text-emerald-200">Pregunta 04/10</p>
            <p className="mt-3 text-2xl font-black">Que pais tiene como capital Ottawa?</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['Canada', 'Peru', 'Chile', 'Japan'].map((country) => (
              <span
                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 font-bold text-stone-800 shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                key={country}
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
