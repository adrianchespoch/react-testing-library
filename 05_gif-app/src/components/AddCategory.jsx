import PropTypes from 'prop-types';

import { useForm } from '../hooks/useForm';

export const AddCategory = ({ onNewCategory }) => {
  const [formValues, handleInputChange, reset] = useForm({ toSearch: '' });
  const { toSearch } = formValues;

  const handleSubmit = e => {
    e.preventDefault();
    if (!toSearch.trim()) return;

    onNewCategory(toSearch.trim());
    reset();
  };

  return (
    <form onSubmit={handleSubmit} aria-label="form">
      <input
        autoFocus
        type="text"
        name="toSearch"
        placeholder="Buscar gifs"
        value={toSearch}
        onChange={handleInputChange}
      />
    </form>
  );
};

AddCategory.propTypes = {
  onNewCategory: PropTypes.func.isRequired,
};
