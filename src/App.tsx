import { Link, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Quiz from './routes/Quiz';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-300 bg-white/80 px-6 py-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <h1 className="text-xl font-semibold">UNIP LeetCode TS</h1>
          <nav className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
            <Link className="hover:text-slate-900 dark:hover:text-white" to="/">Inicio</Link>
            <Link className="hover:text-slate-900 dark:hover:text-white" to="/quiz">Quiz</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
