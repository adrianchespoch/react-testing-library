import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleNewEvent = () => {
    setActiveEvent({
      title: '',
      note: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: '123',
        name: 'Alex',
      },
    });

    openDateModal();
  };

  return (
    <button onClick={handleNewEvent} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
    </button>
  );
};
