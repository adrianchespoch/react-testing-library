import { configureStore } from '@reduxjs/toolkit';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';

import { useUiStore } from '../../src/hooks/useUiStore';
import { uiSlice } from '../../src/store';

const getMockStore = initState => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },

    // como esta el state en 1 punto en concreto
    preloadedState: {
      ui: { ...initState },
    },
  });
};

describe('pruebas en useUiStore', () => {
  test('should retornar los default values', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      // useSelector(): debemos proveer el sotore con el wrapper
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    // default values es lo q retorna el custom hook
    expect(result.current).toEqual({
      isDateModalOpen: false,
      closeDateModal: expect.any(Function),
      openDateModal: expect.any(Function),
    });
  });

  // // Aqui testeo q haga la accion la f(x) xq esto le corresponde a este hook
  test('openDateModal debe establecer true en el isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { openDateModal } = result.current;

    // act: para cambios en el State de la app desde el testing
    act(() => {
      openDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test('closeDateModal debe establecer false en el isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { closeDateModal } = result.current;

    act(() => {
      closeDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });

  /* I didn't implement this functionality, so I don't test it.
  test('toggleDateModal debe de cambiar el estado respectivamente', () => {
      
    const mockStore = getMockStore({ isDateModalOpen: true });
    const { result } = renderHook( () => useUiStore(), {
        wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act(() => {
        result.current.toggleDateModal();
    });
    expect( result.current.isDateModalOpen ).toBeFalsy();
    
    act(() => {
        result.current.toggleDateModal();
    });
    expect( result.current.isDateModalOpen ).toBeTruthy();

  });

  */
});
