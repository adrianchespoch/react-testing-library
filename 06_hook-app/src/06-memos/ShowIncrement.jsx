import React from 'react';

export const ShowIncrement = React.memo(({ increment }) => {
  console.log('Me volvi a genera :(');

  return (
    <button onClick={() => increment(5)} className="btn btn-primary">
      Increment
    </button>
  );
});

// ShowIncrement.displayName = 'MyApp';
