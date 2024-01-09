import { fireEvent, render, screen } from '@testing-library/react';
import { AddCategory } from '../../src/components/AddCategory';

describe('Pruebas en <AddCategory/>', () => {
  test('should cambiar el valor de la caja de texto', () => {
    render(<AddCategory onNewCategory={() => {}} />);

    // El input es textbox
    const input = screen.getByRole('textbox');

    // // Evento change en 1 input
    fireEvent.input(input, { target: { value: 'Saitama' } });
    expect(input.value).toBe('Saitama');
  });

  test('should llamar onNewCategory si el input tiene 1 value', () => {
    const inputValue = 'Saitama';

    // Mock: Simulacion de la funtion
    const onNewCategory = jest.fn();

    render(<AddCategory onNewCategory={onNewCategory} />);

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form'); // Necesito 1 aria-label para encontrar el form

    fireEvent.input(input, { target: { value: inputValue } });
    expect(input.value).toBe(inputValue);

    fireEvent.submit(form);
    expect(input.value).toBe('');

    // Mock de funciones - Funciones de Jest
    expect(onNewCategory).toHaveBeenCalled();
    expect(onNewCategory).toHaveBeenCalledTimes(1);
    expect(onNewCategory).toHaveBeenCalledWith(inputValue);
  });

  test('NO debe llamar el onNewCategory si el input esta vacio', () => {
    const onNewCategory = jest.fn();
    render(<AddCategory onNewCategory={onNewCategory} />);

    const form = screen.getByRole('form');

    fireEvent.submit(form);

    expect(onNewCategory).toBeCalledTimes(0);
    expect(onNewCategory).not.toHaveBeenCalled();
  });
});
