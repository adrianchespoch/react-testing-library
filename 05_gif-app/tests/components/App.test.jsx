import { fireEvent, render, screen } from '@testing-library/react';

import App from '../../src/App';

describe('Pruebas sobre App', () => {
  test('Se debe agregar el title al hacer el submit', () => {
    // escribir input | Form |
    const inputValue = 'Dragon Ball';

    render(<App />);

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);

    expect(screen.getByText(inputValue)).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 3 })[0].innerHTML).toBe(
      inputValue
    );
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(2);
  });

  test('No debe agregar una categoria existente', () => {
    const inputValue = 'Dragon Ball';
    const inputValue2 = 'Dragon Ball';

    render(<App />);

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);

    fireEvent.input(input, { target: { value: inputValue2 } });
    fireEvent.submit(form);

    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(2);
  });
});
