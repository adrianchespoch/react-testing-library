import { LoadingQuote } from '../03-examples/LoadingQuote';
import { Quote } from '../03-examples/Quote';
import { useCounter, useFetch } from '../hooks';

export const Layout = () => {
  const { counter, increment } = useCounter(1);
  const { data, isLoading, hasError } = useFetch(
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
        className="btn btn-primary mt-4 d-block"
      >
        Next quote
      </button>
    </>
  );
};
