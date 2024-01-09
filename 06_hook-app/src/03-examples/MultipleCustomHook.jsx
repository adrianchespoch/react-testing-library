import { useCounter, useFetch } from '../hooks';
import { LoadingQuote } from './LoadingQuote';
import { Quote } from './Quote';

export const MultipleCustomHook = () => {
  const { counter, increment } = useCounter(1);
  const { data, isLoading } = useFetch(
    `https://www.breakingbadapi.com/api/quotes/${counter}`
  );

  const { author, quote } = !!data && data[0]; // xq la API retorna un arr

  return (
    <>
      <h1>MultipleCustomHook</h1>
      <hr />

      {isLoading ? <LoadingQuote /> : <Quote author={author} quote={quote} />}

      <button
        onClick={() => increment()}
        disabled={isLoading}
        className="btn btn-primary mt-4"
      >
        Next quote
      </button>
    </>
  );
};
