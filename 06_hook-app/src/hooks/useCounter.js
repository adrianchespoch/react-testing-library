import { useState } from 'react';

export const useCounter = initValue => {
  const [counter, setCounter] = useState(initValue);

  const increment = (value = 1) => {
    setCounter(current => current + value);
  };
  const decrement = (value = 1) => {
    if (counter <= 0) return;
    setCounter(counter - value);
  };
  const reset = () => setCounter(initValue);

  const setValue = value => setCounter(value);

  return {
    counter,
    increment,
    decrement,
    reset,
    setValue,
  };
};
