import { useState } from 'react';

export const useForm = initState => {
  const [value, setValue] = useState(initState);

  const handleInputChange = ({ target }) => {
    setValue({
      ...value,
      [target.name]: target.value,
    });
  };

  const reset = () => setValue(initState);

  return [value, handleInputChange, reset];
};
