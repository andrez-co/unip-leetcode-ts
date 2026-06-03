import type { CountryApiItem, QuizOption, QuizQuestion } from '../types/quiz';

const QUESTION_LIMIT = 10;
const OPTION_LIMIT = 4;

type RandomFn = () => number;

function shuffle<T>(items: T[], random: RandomFn): T[] {
  return [...items].sort(() => random() - 0.5);
}

function createOptionId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function generateCountryQuestions(
  countries: CountryApiItem[],
  random: RandomFn = Math.random
): QuizQuestion[] {
  const validCountries = countries.filter((country) => country.name.common && country.capital?.[0]);

  if (validCountries.length < OPTION_LIMIT) {
    throw new Error('La API no devolvio suficientes paises validos para crear el quiz.');
  }

  const selectedCountries = shuffle(validCountries, random).slice(0, QUESTION_LIMIT);
  const countryNames = validCountries.map((country) => country.name.common);

  return selectedCountries.map((country, index) => {
    const correctLabel = country.name.common;
    const incorrectOptions = shuffle(
      countryNames.filter((name) => name !== correctLabel),
      random
    ).slice(0, OPTION_LIMIT - 1);

    const optionLabels = shuffle([correctLabel, ...incorrectOptions], random);
    const options: QuizOption[] = optionLabels.map((label) => ({
      id: createOptionId(`${index}-${label}`),
      label,
    }));
    const correctOption = options.find((option) => option.label === correctLabel);

    if (!correctOption) {
      throw new Error('No se pudo asignar la respuesta correcta.');
    }

    return {
      id: `question-${index + 1}`,
      prompt: `Que pais tiene como capital ${country.capital?.[0]}?`,
      countryName: correctLabel,
      capital: country.capital?.[0] ?? '',
      flagUrl: country.flags?.svg ?? country.flags?.png,
      flagAlt: country.flags?.alt,
      options,
      correctOptionId: correctOption.id,
    };
  });
}
