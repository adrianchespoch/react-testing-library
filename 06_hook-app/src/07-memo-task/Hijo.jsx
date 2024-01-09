import React from 'react';

export const Hijo = React.memo(({ number, increment }) => {
  console.log('Me volvi a generar :(');

  return (
    <button className="btn btn-primary mr-3" onClick={() => increment(number)}>
      {number}
    </button>
  );
});
