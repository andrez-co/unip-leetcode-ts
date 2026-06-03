export type CountryApiItem = {
  name: {
    common: string;
  };
  capital?: string[];
  flags?: {
    png?: string;
    svg?: string;
    alt?: string;
  };
};

export type QuizOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  countryName: string;
  capital: string;
  flagUrl?: string;
  flagAlt?: string;
  options: QuizOption[];
  correctOptionId: string;
};

export type UserAnswer = {
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean;
  timedOut: boolean;
};
