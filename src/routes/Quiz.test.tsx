import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useCountryQuiz } from '../hooks/useCountryQuiz';
import type { CountryApiItem } from '../types/quiz';

const countries: CountryApiItem[] = [
  { name: { common: 'Colombia' }, capital: ['Bogota'] },
  { name: { common: 'Peru' }, capital: ['Lima'] },
  { name: { common: 'Chile' }, capital: ['Santiago'] },
  { name: { common: 'Argentina' }, capital: ['Buenos Aires'] },
];

function TestQuizState({ loadCountries }: { loadCountries: () => Promise<CountryApiItem[]> }) {
  const quiz = useCountryQuiz({ loadCountries });

  if (quiz.status === 'loading') {
    return <p role="status">Cargando preguntas...</p>;
  }

  if (quiz.status === 'error') {
    return <p role="alert">{quiz.error}</p>;
  }

  return <p>{quiz.questions.length} preguntas listas</p>;
}

describe('useCountryQuiz async states', () => {
  it('muestra el estado de carga mientras la API responde', () => {
    const loadCountries = vi.fn(() => new Promise<CountryApiItem[]>(() => undefined));

    render(<TestQuizState loadCountries={loadCountries} />);

    expect(screen.getByRole('status')).toHaveTextContent('Cargando preguntas...');
  });

  it('muestra el estado de error cuando la API falla', async () => {
    const loadCountries = vi.fn(() => Promise.reject(new Error('API no disponible')));

    render(<TestQuizState loadCountries={loadCountries} />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('API no disponible');
    });
  });

  it('crea preguntas cuando la API responde correctamente', async () => {
    const loadCountries = vi.fn(() => Promise.resolve(countries));

    render(<TestQuizState loadCountries={loadCountries} />);

    await waitFor(() => {
      expect(screen.getByText('4 preguntas listas')).toBeInTheDocument();
    });
  });
});
