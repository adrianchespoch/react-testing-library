import React from 'react';
import ReactDOM from 'react-dom/client';
import { CounterApp } from './01_useState/CounterApp';
import { CounterWithCustomHook } from './01_useState/CounterWithCustomHook';
import { FormWithCustomHook } from './02_useEffect/FormWithCustomHook';
import { SimpleForm } from './02_useEffect/SimpleForm';
import { MultipleCustomHook } from './03-examples/MultipleCustomHook';
import { FocusScreen } from './04_useRef/FocusScreen';
import { Layout } from './05_useLayoutEffect/Layout';
import { CallbackHook } from './06-memos/CallbackHook';
import { MemoHook } from './06-memos/MemoHook';
import { Memorize } from './06-memos/Memorize';
import { Padre } from './07-memo-task/Padre';

import './index.css';
// import './08_useReducer/intro-reducer';
import { TodoApp } from './08_useReducer/TodoApp';
import { MainApp } from './09_useContext/MainApp';
import { AppRouter } from './09_useContext/AppRouter';
import { UserProvider } from './09_useContext/context/UserProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // {/* <App /> */}
  // {/* <CounterApp /> */}
  //{/* <CounterWithCustomHook /> */}

  // // useEffect
  // <SimpleForm />
  // <FormWithCustomHook />

  // // Example
  // <MultipleCustomHook />

  // // useRef
  // <FocusScreen />

  // // useLayoutEffect
  // <Layout />

  // // memo()
  // <Memorize />

  // // useMemo
  // <MemoHook />

  // // useCallback
  // <CallbackHook />
  // <Padre />

  // // useReducer()
  // <TodoApp />

  // // useContext()
  // <MainApp />
  <AppRouter />

  // </React.StrictMode>
);
