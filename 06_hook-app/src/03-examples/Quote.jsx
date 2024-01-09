import PropTypes from 'prop-types';
import { useLayoutEffect, useRef, useState } from 'react';

export const Quote = ({ quote, author }) => {
  const pRef = useRef();
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });

  // useLayoutEffect  <-  Size de 1 div despues de q todas las modif. del DOM se completen
  useLayoutEffect(() => {
    const { height, width } = pRef.current.getBoundingClientRect();

    setBoxSize({ height, width });
  }, [quote]);

  return (
    <>
      <blockquote
        className="blockquote text-end mt-3"
        style={{ display: 'flex' }}
      >
        <p ref={pRef} className="my-4">
          {quote}
        </p>
        <footer className="blockquote-footer">{author}</footer>
      </blockquote>

      <code>{JSON.stringify(boxSize, null, 3)}</code>
    </>
  );
};

Quote.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
