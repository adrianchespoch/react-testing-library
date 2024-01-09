import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected, activeEvent } =
    useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleDeleteEvent = () => {
    activeEvent?.id && startDeletingEvent();
  };

  return (
    <button
      onClick={handleDeleteEvent}
      className="btn btn-danger fab-danger"
      style={{
        display: hasEventSelected && !isDateModalOpen ? '' : 'none',
        zIndex: '100',
      }}
      data-testid="trash-btn"
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
