import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Congratulations from './Congratulations';

describe('Congratulations interactions', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('guarda el high score y ejecuta jugar de nuevo', async () => {
    const user = userEvent.setup();
    const handlePlayAgain = vi.fn();

    render(
      <Congratulations
        correctAnswers={8}
        onPlayAgain={handlePlayAgain}
        totalQuestions={10}
      />
    );

    expect(await screen.findByText(/High score/i)).toBeInTheDocument();
    expect(window.localStorage.getItem('country-quiz-high-score')).toBe('8');

    await user.click(screen.getByRole('button', { name: /Jugar de nuevo/i }));

    expect(handlePlayAgain).toHaveBeenCalledTimes(1);
  });
});
