import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from '../../../src/store/ui/uiSlice';

describe('pruebas en uiSlice', () => {
  test('debe retornar el default state', () => {
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
    expect(uiSlice.name).toBe('ui');
  });

  test('debe cambair el isDateModalOpen correctamente', () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
