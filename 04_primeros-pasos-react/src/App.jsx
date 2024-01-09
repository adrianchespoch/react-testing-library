import { useState } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import './assets/tnrbjwasofaag8cm7l9v.jpg';
import './assets/react.svg';

function App({ title, initCounter }) {
  const [counter, setCounter] = useState(initCounter);

  // console.log('Render TODO el FC');  // Cuando CAMBIA el STATE se vuelve a Ejecutar el FC

  // // Si la f(x) esta fuera del FC no se reasisgna espacio en memoria con c/rerender
  const handleCounter = () => {
    // setCounter(counter + 1);
    setCounter(c => c + 1);
  };
  const handleSubtract = () => setCounter(counter - 1);
  const handleReset = () => setCounter(initCounter);

  return (
    <div className="App">
      <h1 data-testid="test-title">{title}</h1>
      <h2>{counter}</h2>

      {/* <Counter /> */}
      <div className="card">
        <button className="btn-increase" onClick={handleCounter}>
          +1
        </button>
        <button id="btn-decrease" onClick={handleSubtract}>
          -1
        </button>
        <button aria-label="btn-reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

// // // PropTypes
App.propTypes = {
  title: PropTypes.string.isRequired,
  initCounter: PropTypes.number.isRequired,
};

// // DefaultProps: Entran antes q los PropTypes, evitan error si es  isRequired
App.defaultProps = {
  title: 'No title!',
};
