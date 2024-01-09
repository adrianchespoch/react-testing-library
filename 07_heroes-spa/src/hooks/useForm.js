import { useState } from 'react';

export const useForm = initState => {
  const [formValues, setFormValues] = useState(initState);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onReset = () => setFormValues(initState);

  return { ...formValues, formValues, onInputChange, onReset };
};
