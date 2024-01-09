import { useCounter } from '../hooks/useCounter';

export const CounterWithCustomHook = () => {
  const { counter, increment, decrement, reset, setValue } = useCounter(10);

  return (
    <>
      <h1>Counter with custom hooks: {counter}</h1>
      <hr />
      <button onClick={() => increment(2)} className="btn btn-primary">
        +1
      </button>
      <button onClick={reset} className="btn btn-danger">
        Reset
      </button>
      <button onClick={() => decrement(2)} className="btn btn-secondary">
        -1
      </button>
      <button onClick={() => setValue(21)} className="btn btn-warning">
        21
      </button>
    </>
  );
};
