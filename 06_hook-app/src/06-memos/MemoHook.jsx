import { useMemo, useState } from 'react';
import { useCounter } from '../hooks';

const heavyStuff = iterationNumber => {
  for (let i = 0; i < iterationNumber; i++) {
    console.log('Ahi vamos...');
  }

  return `${iterationNumber} iteraciones realizadas`;
};

export const MemoHook = () => {
  const { counter, increment } = useCounter(4200);
  const [show, setShow] = useState(true);

  const memorizeValue = useMemo(() => heavyStuff(counter), [counter]);

  return (
    <>
      <h1>
        Counter: <small>{counter}</small>
      </h1>
      <hr />

      <h4>{memorizeValue}</h4>

      <button onClick={() => increment()} className="btn btn-primary">
        +1
      </button>

      <button
        onClick={() => setShow(!show)}
        className="btn btn-outline-primary"
      >
        Show/Hide: {JSON.stringify(show)}
      </button>
    </>
  );
};
