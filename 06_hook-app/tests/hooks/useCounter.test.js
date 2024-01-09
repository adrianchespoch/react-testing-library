const { renderHook, act } = require('@testing-library/react');
const { useCounter } = require('../../src/hooks/useCounter');

describe('Pruebas sobre useCounter', () => {
  const initValue = 12;

  test('debe retornar el valor enviado', () => {
    const { result } = renderHook(() => useCounter(initValue));
    const { counter, decrement, increment, reset } = result.current;

    expect(counter).toBe(initValue);
    expect(increment).toEqual(expect.any(Function));
    expect(decrement).toEqual(expect.any(Function));
    expect(reset).toEqual(expect.any(Function));
  });

  test('debe incrementar el contador', () => {
    const { result } = renderHook(() => useCounter(initValue));
    const { increment } = result.current;

    act(() => {
      increment();
      increment(2);
    });

    // Con primitivos no destructuring
    expect(result.current.counter).toBe(initValue + 3);
  });

  test('debe decrementar el contador', () => {
    const { result } = renderHook(() => useCounter(initValue));
    const { decrement } = result.current;

    act(() => {
      decrement(3);
    });

    expect(result.current.counter).toBe(initValue - 3);
  });

  test('debe hacer el reset al contador', () => {
    const { result } = renderHook(() => useCounter(initValue));
    const { increment, reset } = result.current;

    act(() => {
      increment(15);
      reset();
    });

    expect(result.current.counter).toBe(initValue);
  });
});
