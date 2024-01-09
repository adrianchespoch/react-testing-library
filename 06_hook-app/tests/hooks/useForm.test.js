import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useForm } from '../../src/hooks/useForm';

describe('Pruebas en useForm', () => {
  const initalForm = {
    name: 'Alex',
    email: 'alex@axes.com',
  };
  const newName = 'Alex Pro';

  test('debe retornar los valores por defecto', () => {
    const { result } = renderHook(() => useForm(initalForm));

    expect(result.current).toEqual({
      name: initalForm.name,
      email: initalForm.email,
      formValues: initalForm,
      onInputChange: expect.any(Function),
      onReset: expect.any(Function),
    });
  });

  test('debe cambiar el nombre del form', () => {
    const { result } = renderHook(() => useForm(initalForm));
    const { onInputChange } = result.current;

    act(() => {
      onInputChange({ target: { name: 'name', value: newName } });
    });

    expect(result.current.name).toBe(newName);
    expect(result.current.formValues.name).toBe(newName);
  });

  test('debe resetear el form', () => {
    const { result } = renderHook(() => useForm(initalForm));
    const { onInputChange, onReset } = result.current;

    act(() => {
      onInputChange({ target: { name: 'name', value: newName } });
      onReset();
    });

    expect(result.current.name).toBe(initalForm.name);
    expect(result.current.formValues.name).toBe(initalForm.name);
  });
});
