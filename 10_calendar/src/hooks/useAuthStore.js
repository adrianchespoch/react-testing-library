import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onLogoutCalendar,
} from '../store';

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(state => state.auth);

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth/login', {
        email,
        password,
      });

      // TODO: guardar en el store la fecha y validar q no se haga la peticion antes de q expire
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout(error.response.data.msg));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 180);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth/signup', {
        name,
        email,
        password,
      });

      // lo Auth inmediatamente. Podria ser un email de confirmacion
      const { data: loginData } = await calendarApi.post('/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout(error.response.data.errors.email.msg));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 180);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin(data.user));
    } catch (error) {
      console.log(error.response.data);
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    // Properties
    status,
    user,
    errorMessage,

    // Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
