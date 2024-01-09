import {
  loginWithEmailAndPass,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './authSlice';

export const chekingAuthentication = () => {
  return async dispatch => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIng = () => {
  return async dispatch => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  displayName,
  email,
  password,
}) => {
  return async dispatch => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        displayName,
        email,
        password,
      });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailAndPass = (email, password) => {
  return async dispatch => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailAndPass(email, password);
    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async dispatch => {
    await logoutFirebase();

    // resetear el state del journal
    dispatch(clearNotesLogout());

    dispatch(logout());
  };
};
