import { useState } from 'react';

export const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="card">
      <button onClick={() => setCounter(counter + 1)}>
        count is: {counter}
      </button>
    </div>
  );
};
