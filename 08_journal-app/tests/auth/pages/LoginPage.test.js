import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailAndPass = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIng: () => mockStartGoogleSignIn,
  startLoginWithEmailAndPass: (email, password) => {
    return () => mockStartLoginWithEmailAndPass(email, password);
  },
}));

// Mock al useDispatch de react-redux para testear los args de startLoginWithEmailAndPass
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => fn => fn(),
}));

const store = configureStore({
  reducer: { auth: authSlice.reducer },

  // establecer el state: si es checking no se puede hacer click en el btn, asi tenemos el FC
  preloadedState: { auth: notAuthenticatedState },
});

describe('pruebas en <LoginPage />', () => {
  beforeEach(() => jest.clearAllMocks());

  test('debe renderizar el FC correctamente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('button google debe llamar el startGoogleSignIng', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const btnGoogle = screen.getByLabelText('google-btn');
    fireEvent.click(btnGoogle);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test('submit debe llamar startLoginWithEmailAndPass', () => {
    const email = 'alex@test.com',
      password = '123123';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Email' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password },
    });

    const loginForm = screen.getByTestId('form');
    fireEvent.submit(loginForm);

    // W con estos mock
    expect(mockStartLoginWithEmailAndPass).toHaveBeenCalledWith(
      email,
      password
    );

    // Recived    Expected
    // expect(12).toBe(3);
  });
});
