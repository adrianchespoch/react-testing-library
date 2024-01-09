import { fireEvent, render, screen } from '@testing-library/react';

import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useUiStore } from '../../../src/hooks/useUiStore';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';

// Otra forma de hacer mock
jest.mock('../../../src/hooks/useCalendarStore');
jest.mock('../../../src/hooks/useUiStore');

describe('pruebas en <FabDelete />', () => {
  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe renderizarce correctamente', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });
    useUiStore.mockReturnValue({
      isDateModalOpen: true || false, //no importa si es true or false
    });

    render(<FabDelete />);

    const btn = screen.getByTestId('trash-btn');

    expect(btn.classList).toContain('btn');
    expect(btn.classList).toContain('btn-danger');
    expect(btn.classList).toContain('fab-danger');

    expect(btn.style.display).toBe('none');
  });

  test('debe mostrar el boton si se tiene un active event', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });
    useUiStore.mockReturnValue({
      isDateModalOpen: false,
    });

    render(<FabDelete />);

    const btn = screen.getByTestId('trash-btn');

    expect(btn.style.display).toBe('');
  });

  test('debe llamar startDeletingEvent si hay active event', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
      activeEvent: { id: 'SOME ID' },
    });
    useUiStore.mockReturnValue({
      isDateModalOpen: false,
    });

    render(<FabDelete />);

    const btn = screen.getByTestId('trash-btn');

    fireEvent.click(btn);

    expect(mockStartDeletingEvent).toHaveBeenCalledTimes(1);
  });
});
