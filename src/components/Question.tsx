import type { QuizQuestion, UserAnswer } from '../types/quiz';

type QuestionProps = {
  question: QuizQuestion;
  answer?: UserAnswer;
  onAnswer: (optionId: string) => void;
};

type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

function playAnswerSound(isCorrect: boolean) {
  const AudioContextConstructor =
    window.AudioContext ?? (window as AudioWindow).webkitAudioContext;

  if (!AudioContextConstructor) {
    return;
  }

  try {
    const audioContext = new AudioContextConstructor();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = isCorrect ? 740 : 180;
    gain.gain.setValueAtTime(0.001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.16, audioContext.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.16);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    void audioContext.resume();
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.18);
    window.setTimeout(() => {
      void audioContext.close();
    }, 240);
  } catch {
    return;
  }
}

function Question({ question, answer, onAnswer }: QuestionProps) {
  const optionLetters = ['A', 'B', 'C', 'D'];

  function handleAnswer(optionId: string) {
    playAnswerSound(optionId === question.correctOptionId);
    onAnswer(optionId);
  }

  return (
    <article className="space-y-6">
      <div className="grid gap-5 md:grid-cols-[10rem_1fr] md:items-center">
        {question.flagUrl ? (
          <img
            alt={question.flagAlt ?? `Bandera de ${question.countryName}`}
            className="h-28 w-full rounded-3xl border border-stone-200 object-cover shadow-lg shadow-stone-900/10 dark:border-stone-700"
            src={question.flagUrl}
          />
        ) : (
          <div className="grid h-28 place-items-center rounded-3xl border border-stone-200 bg-stone-100 font-black text-stone-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
            FLAG
          </div>
        )}
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-600 dark:text-orange-300">
            Capital: {question.capital}
          </p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-stone-950 dark:text-white">
            {question.prompt}
          </h2>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option, index) => {
          const isSelected = answer?.selectedOptionId === option.id;
          const isCorrect = option.id === question.correctOptionId;
          const shouldShowCorrect = Boolean(answer) && isCorrect;
          const shouldShowWrong = Boolean(answer) && isSelected && !isCorrect;
          const feedbackClass = shouldShowCorrect
            ? 'border-emerald-500 bg-emerald-100 text-emerald-950 shadow-emerald-900/10 dark:border-emerald-300 dark:bg-emerald-950 dark:text-emerald-100'
            : shouldShowWrong
              ? 'border-red-500 bg-red-100 text-red-950 shadow-red-900/10 dark:border-red-300 dark:bg-red-950 dark:text-red-100'
              : 'border-stone-200 bg-white text-stone-900 hover:border-emerald-400 hover:bg-emerald-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:hover:border-emerald-300 dark:hover:bg-stone-900';

          return (
            <button
              className={`group min-h-20 rounded-3xl border p-4 text-left font-black shadow-sm transition disabled:cursor-not-allowed ${feedbackClass}`}
              data-correct={shouldShowCorrect}
              data-wrong={shouldShowWrong}
              disabled={Boolean(answer)}
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              type="button"
            >
              <span className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-stone-100 text-sm text-stone-700 group-disabled:bg-white/60 dark:bg-stone-800 dark:text-stone-100">
                  {optionLetters[index]}
                </span>
                <span>{option.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
}

export default Question;
