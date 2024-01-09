export const events = [
  {
    id: '1',
    start: new Date('2022-10-21 12:00:00'),
    end: new Date('2022-10-21 15:00:00'),
    title: 'Cumple Alex',
    notes: 'Comprar el pastel',
  },
  {
    id: '2',
    start: new Date('2022-11-09 12:00:00'),
    end: new Date('2022-11-09 15:00:00'),
    title: 'Cumple Melissa',
    notes: 'Comprar Snacks',
  },
];

export const initState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
