import { fireEvent, render, screen } from '@testing-library/react';

import { MultipleCustomHook } from '../../src/03-examples/MultipleCustomHook';
import { useCounter } from '../../src/hooks/useCounter';
import { useFetch } from '../../src/hooks/useFetch';

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('Pruebas en <MultipleCustomHook />', () => {
  const mockIncrement = jest.fn();
  useCounter.mockReturnValue({
    counter: 1,
    increment: mockIncrement,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe mostar el componente por defecto', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      hasError: null,
    });

    render(<MultipleCustomHook />);

    expect(screen.getByText('Loading...')).toBeTruthy();
    expect(screen.getByText('MultipleCustomHook')).toBeTruthy();

    const nextButton = screen.getByRole('button', { name: 'Next quote' });
    expect(nextButton.disabled).toBeTruthy();
  });

  test('debe mostrar un Quote', () => {
    useFetch.mockReturnValue({
      data: [{ author: 'Alex', quote: 'Hello World!' }],
      isLoading: false,
      hasError: null,
    });

    render(<MultipleCustomHook />);

    expect(screen.getByText('Hello World!')).toBeTruthy();
    expect(screen.getByText('Alex')).toBeTruthy();

    const nextButton = screen.getByRole('button', { name: 'Next quote' });
    expect(nextButton.disabled).toBeFalsy();
  });

  test('debe llamar el increment', () => {
    useFetch.mockReturnValue({
      data: [{ author: 'Alex', quote: 'Hello World!' }],
      isLoading: false,
      hasError: null,
    });

    render(<MultipleCustomHook />);

    const nextButton = screen.getByRole('button', { name: 'Next quote' });
    fireEvent.click(nextButton);

    expect(mockIncrement).toHaveBeenCalled();
    expect(mockIncrement).toHaveBeenCalledWith(); // llamado SIN args
  });
});
