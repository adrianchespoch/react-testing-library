import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

import { useCalendarStore, useUiStore } from '../../hooks';
import { getEnvVariables } from '../../helpers';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overlay: {
      zIndex: 4,
    },
  },
};

getEnvVariables().VITE_MODE !== 'test' && Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent, setActiveEvent } = useCalendarStore();
  const [formSubmited, setFormSubmited] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    note: '',
    start: new Date(),
    end: addHours(new Date(), 3),
  });

  const titleClass = useMemo(() => {
    if (!formSubmited) return '';

    return formValues.title.length <= 0 ? 'is-invalid' : '';
  }, [formValues.title, formSubmited]);

  useEffect(() => {
    if (activeEvent !== null) setFormValues({ ...activeEvent });
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleDateChange = (event, changin) => {
    setFormValues({ ...formValues, [changin]: event });
  };

  const onCloseModal = () => {
    closeDateModal();
    setActiveEvent(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormSubmited(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (!difference || difference <= 0)
      return Swal.fire('Fechas incorrectas!', 'Revisar las fechas', 'error');
    if (!formValues.title.length) return;

    // Add new note
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmited(false);
    setActiveEvent(null);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={event => handleDateChange(event, 'start')}
            dateFormat="Pp"
            className="form-control"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={event => handleDateChange(event, 'end')}
            dateFormat="Pp"
            className="form-control"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            autoComplete="off"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="note"
            value={formValues.note}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
