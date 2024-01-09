import { useEffect, useMemo, useState } from 'react';

export const useForm = (initState = {}, formValidations = {}) => {
  const [formValues, setFormValues] = useState(initState);

  const [formValidation, setFormValidation] = useState({});

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  // Cada vez q cambie algun input se dispare este useEffect
  useEffect(() => {
    createValidators();
  }, [formValues]);

  /* // // Cuando cambie la active note/valores del INIT State se dispare este efecto
  // Con esto ya NO podemos enviar el initState directo desde el useForm, debe ser credo aparte para q tenga la misma referencia, sino da un loop infinito
  useEffect(() => {
    setFormValues(initState);
  }, [initState]);
 */

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const reset = () => setFormValues(initState);

  const setFormValuesFx = formValues => {
    setFormValues(formValues);
  };

  // Validations
  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formValues[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
    // console.log(formCheckedValues);
  };

  return {
    ...formValues,
    formValues,
    handleInputChange,
    reset,
    setFormValuesFx,

    ...formValidation,
    isFormValid,
  };
};
