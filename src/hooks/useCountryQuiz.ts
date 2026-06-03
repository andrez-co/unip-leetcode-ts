import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchCountries } from '../services/countries';
import type { CountryApiItem, QuizQuestion, UserAnswer } from '../types/quiz';
import { generateCountryQuestions } from '../utils/quizGenerator';

const TIMER_SECONDS = 15;

type LoadCountries = () => Promise<CountryApiItem[]>;

type QuizStatus = 'loading' | 'ready' | 'error' | 'finished';

type UseCountryQuizOptions = {
  loadCountries?: LoadCountries;
};

export function useCountryQuiz(options: UseCountryQuizOptions = {}) {
  const { loadCountries = fetchCountries } = options;
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
  const [status, setStatus] = useState<QuizStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const currentAnswer = useMemo(
    () => answers.find((answer) => answer.questionId === currentQuestion?.id),
    [answers, currentQuestion?.id]
  );

  const score = useMemo(
    () => answers.filter((answer) => answer.isCorrect).length,
    [answers]
  );

  const allAnswered = questions.length > 0 && answers.length === questions.length;

  const answerQuestion = useCallback(
    (optionId: string | null, timedOut = false) => {
      if (!currentQuestion) {
        return;
      }

      setAnswers((previousAnswers) => {
        if (previousAnswers.some((answer) => answer.questionId === currentQuestion.id)) {
          return previousAnswers;
        }

        return [
          ...previousAnswers,
          {
            questionId: currentQuestion.id,
            selectedOptionId: optionId,
            isCorrect: optionId === currentQuestion.correctOptionId && !timedOut,
            timedOut,
          },
        ];
      });
    },
    [currentQuestion]
  );

  const goToQuestion = useCallback(
    (index: number) => {
      if (index < 0 || index >= questions.length) {
        return;
      }

      setCurrentQuestionIndex(index);
      setSecondsLeft(TIMER_SECONDS);
    },
    [questions.length]
  );

  const nextQuestion = useCallback(() => {
    goToQuestion(currentQuestionIndex + 1);
  }, [currentQuestionIndex, goToQuestion]);

  const previousQuestion = useCallback(() => {
    goToQuestion(currentQuestionIndex - 1);
  }, [currentQuestionIndex, goToQuestion]);

  const finishQuiz = useCallback(() => {
    setStatus('finished');
  }, []);

  const playAgain = useCallback(() => {
    setStatus('loading');
    setError(null);
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setSecondsLeft(TIMER_SECONDS);
  }, []);

  useEffect(() => {
    if (status !== 'loading') {
      return;
    }

    let shouldIgnore = false;

    async function loadQuiz() {
      try {
        const countries = await loadCountries();

        if (shouldIgnore) {
          return;
        }

        setQuestions(generateCountryQuestions(countries));
        setStatus('ready');
      } catch (caughtError) {
        if (shouldIgnore) {
          return;
        }

        setError(caughtError instanceof Error ? caughtError.message : 'Error inesperado.');
        setStatus('error');
      }
    }

    void loadQuiz();

    return () => {
      shouldIgnore = true;
    };
  }, [loadCountries, status]);

  useEffect(() => {
    if (status !== 'ready' || !currentQuestion || currentAnswer) {
      return;
    }

    if (secondsLeft === 0) {
      answerQuestion(null, true);
      return;
    }

    const timerId = window.setTimeout(() => {
      setSecondsLeft((currentSeconds) => Math.max(currentSeconds - 1, 0));
    }, 1000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [answerQuestion, currentAnswer, currentQuestion, secondsLeft, status]);

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    currentAnswer,
    answers,
    secondsLeft,
    status,
    error,
    score,
    allAnswered,
    answerQuestion,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    playAgain,
  };
}
