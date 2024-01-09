import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { calendarApi } from '../../src/api';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store';
import {
  authenticatedState,
  initState,
  notAuthenticatedState,
} from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';

const getMockStore = initState => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },

    // como esta el state en 1 punto en concreto
    preloadedState: {
      auth: { ...initState },
    },
  });
};

describe('pruebas en useAuthStore', () => {
  beforeEach(() => localStorage.clear());

  test('should return default values', () => {
    const mockStore = getMockStore(initState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      // Properties
      ...initState,

      // Methods
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test('startLogin debe hacer login correctamente', async () => {
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: {
        name: testUserCredentials.name,
        uid: testUserCredentials.uid,
        email: testUserCredentials.email,
      },
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });

  test('startLogin debe fallar la auth', async () => {
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: 'some@email.com',
        password: 'somepassword',
      });
    });

    const { errorMessage, status, user } = result.current;

    expect(localStorage.getItem('token')).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      // errorMessage: expect.any(String),
      errorMessage:
        'Hubo un problema al iniciar sesión. Comprueba tu correo electrónico y contraseña o crea una cuenta.',
      status: 'not-authenticated',
      user: {},
    });

    // esperar un time: esera a q esto pase <- Si es un timeout no debe ser muy >
    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  // // // NO vamos a llegar al back
  // usamos un spy de jest para simular la respuesta del backend
  test('startRegister debe crear un user', async () => {
    const newUser = {
      name: 'Test user 2',
      email: 'some@email.com',
      password: 'somepassword',
    };

    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        msg: 'Usuario creado correctamente!',
        user: {
          name: newUser.name,
          email: newUser.email,
          uid: '632b1752ca7e9175d3330dea',
        },
      },
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: {
        name: newUser.name,
        email: newUser.email,
        uid: '632b1752ca7e9175d3330dea',
      },
    });

    // Destruir el spy para q en otros test si se pueda llegar al back si asi se quisiera
    spy.mockRestore();
  });

  test('startRegister debe fallar la creacion', async () => {
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "The user's email is already registered!",
      status: 'not-authenticated',
      user: {},
    });
  });

  test('checkAuthToken debe fallar si no hay 1 token en el ls', async () => {
    const mockStore = getMockStore(initState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual(notAuthenticatedState);
  });

  test('checkAuthToken debe Autenticar si hay 1 token valido', async () => {
    const { data } = await calendarApi.post('/auth/login', testUserCredentials);
    localStorage.setItem('token', data.token);

    const mockStore = getMockStore(initState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    delete testUserCredentials.password;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: testUserCredentials,
    });
  });
});
