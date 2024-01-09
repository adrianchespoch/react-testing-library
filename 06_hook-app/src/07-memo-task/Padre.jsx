import { useCallback, useState } from 'react';
import { Hijo } from './Hijo';

export const Padre = () => {
  const numbers = [2, 4, 6, 8, 10];
  const [value, setValue] = useState(0);

  const increment = useCallback(num => setValue(v => v + num), []);

  return (
    <div>
      <h1>Padre</h1>
      <p>Total: {value} </p>
      <hr />

      {numbers.map(n => (
        <Hijo key={n} number={n} increment={increment} />
      ))}
    </div>
  );
};
