import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertToDateEvent } from '../helpers';

import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = calendarEvent => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertToDateEvent(data.events);

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  const startSavingEvent = async calendarEvent => {
    try {
      // Updating
      if (calendarEvent.id) {
        const { data } = await calendarApi.put(
          `/events/${calendarEvent.id}`,
          calendarEvent
        );

        return dispatch(onUpdateEvent({ ...calendarEvent, user }));
      }

      // Creating
      const { data } = await calendarApi.post('/events', calendarEvent);

      dispatch(
        onAddNewEvent({ ...calendarEvent, id: data.calendar_event.id, user })
      );
    } catch (error) {
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);

      dispatch(onDeleteEvent());
    } catch (error) {
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
