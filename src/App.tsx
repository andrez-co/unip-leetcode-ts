import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Quiz from './routes/Quiz';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#d6f5ef,transparent_34%),linear-gradient(135deg,#f8fafc_0%,#eef6f4_45%,#fff7ed_100%)] text-stone-950 dark:bg-[radial-gradient(circle_at_top_left,#14532d,transparent_30%),linear-gradient(135deg,#101410_0%,#1c241d_55%,#2a2118_100%)] dark:text-stone-50">
      <header className="border-b border-stone-200/80 bg-white/75 px-6 py-4 shadow-sm backdrop-blur dark:border-stone-700/70 dark:bg-stone-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link className="text-xl font-black text-emerald-950 dark:text-emerald-50" to="/">
            Country Quiz
          </Link>
          <nav className="flex items-center gap-3 text-sm font-semibold text-stone-600 dark:text-stone-300">
            <Link className="rounded-full px-3 py-2 hover:bg-stone-100 hover:text-stone-950 dark:hover:bg-stone-800 dark:hover:text-white" to="/">
              Inicio
            </Link>
            <Link className="rounded-full px-3 py-2 hover:bg-stone-100 hover:text-stone-950 dark:hover:bg-stone-800 dark:hover:text-white" to="/quiz">
              Quiz
            </Link>
            <button
              aria-pressed={isDarkMode}
              className="rounded-full border border-stone-300 bg-white px-3 py-2 text-stone-700 shadow-sm transition hover:border-emerald-500 hover:text-emerald-800 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-emerald-300 dark:hover:text-emerald-100"
              onClick={() => setIsDarkMode((currentValue) => !currentValue)}
              type="button"
            >
              {isDarkMode ? 'Claro' : 'Oscuro'}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
