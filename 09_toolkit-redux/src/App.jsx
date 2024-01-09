import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment, incrementByAmount } from './store/slices/counter';
import './App.css';

function App() {
  // Extraemos lo q definimos en el initState del slice
  const { counter } = useSelector(state => state.counter);

  // ya sabe a q reducer va a llegar
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Count is: {counter}</h1>

      <div className="card">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementByAmount(3))}>Increment by 2</button>
      </div>
    </div>
  );
}

export default App;
