import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice';
import {
  calendarWithActiveEventsState,
  calendarWithEventsState,
  events,
  initState,
} from '../../fixtures/calendarState';

describe('pruebas en calendarSlice', () => {
  test('should retornar el initState/default state', () => {
    expect(calendarSlice.getInitialState()).toEqual(initState);
    expect(calendarSlice.name).toBe('calendar');
  });

  test('onSetActiveEvent debe activar el event', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );

    expect(state.activeEvent).toEqual(events[0]);
    expect(state).toEqual(calendarWithActiveEventsState);
  });

  test('onAddNewEvent debe agregar un new event', () => {
    const newEvent = {
      id: '3',
      start: new Date('2022-11-21 12:00:00'),
      end: new Date('2022-11-27 15:00:00'),
      title: 'Cumple Tupac',
      notes: 'Comprar menta',
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.events.length).toBe(events.length + 1);
    expect(state.events).toEqual([...events, newEvent]);
  });

  test('onUpdateEvent debe actualizar el evento', () => {
    const updatedEvent = {
      id: '1',
      start: new Date('2022-11-21 12:00:00'),
      end: new Date('2022-11-27 15:00:00'),
      title: 'Cumple Tupac',
      notes: 'Comprar menta',
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );

    expect(state.events).toEqual(
      events.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    expect(state.events).toContain(updatedEvent);
    expect(state.events.length).toBe(events.length);
  });

  test('onDeleteEvent debe borrar el Active Event', () => {
    // Se eleminina el active event xq en nuestra logica NO pasamos el id del evento a eliminar. Solo se lo selecciona, se activa y ya con eso lo eliminamos.
    // En otros casos es normal pasar el id del elemento a eliminar, so usamos  .filter()
    const state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      onDeleteEvent()
    );

    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
    expect(state.events).toEqual([events[1]]);
    expect(state.events.length).toBe(events.length - 1);
  });

  test('onLoadEvents debe setear los eventos', () => {
    const state = calendarSlice.reducer(initState, onLoadEvents(events));
    expect(state.events).toEqual(events);
    expect(state.isLoadingEvents).toBeFalsy();

    const newState = calendarSlice.reducer(state, onLoadEvents(events));
    expect(newState.events.length).toBe(events.length);
  });

  test('onLoadEvents debe agregar nuevos eventos sin duplicarlos', () => {});

  test('onLogoutCalendar debe limpiar el calendar state', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      onLogoutCalendar()
    );

    expect(state).toEqual(initState);
  });
});
