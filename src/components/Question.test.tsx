import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Question from './Question';
import type { QuizQuestion } from '../types/quiz';

const question: QuizQuestion = {
  id: 'question-1',
  prompt: 'Que pais tiene como capital Brasilia?',
  countryName: 'Brazil',
  capital: 'Brasilia',
  flagUrl: 'https://example.com/br.svg',
  flagAlt: 'Bandera de Brazil',
  options: [
    { id: 'brazil', label: 'Brazil' },
    { id: 'peru', label: 'Peru' },
    { id: 'chile', label: 'Chile' },
    { id: 'japan', label: 'Japan' },
  ],
  correctOptionId: 'brazil',
};

describe('Question interactions', () => {
  it('dispara el evento al seleccionar una opcion', async () => {
    const user = userEvent.setup();
    const handleAnswer = vi.fn();

    render(<Question onAnswer={handleAnswer} question={question} />);

    await user.click(screen.getByRole('button', { name: /Brazil/i }));

    expect(handleAnswer).toHaveBeenCalledWith('brazil');
  });
});
