import { useRef } from 'react';

export const FocusScreen = () => {
  const inputRef = useRef();

  const onClickBtn = () => {
    // console.log(inputRef);
    inputRef.current.select();
  };

  return (
    <>
      <h1>Focus Screen</h1>
      <hr />

      <input
        ref={inputRef}
        type="text"
        placeholder="Name"
        className="form-control"
      />

      <button onClick={onClickBtn} className="btn btn-primary mt-3">
        Set focus
      </button>
    </>
  );
};
