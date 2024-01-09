import {
  loginWithEmailAndPass,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../../src/firebase/providers';
import {
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  chekingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSignIng,
  startLoginWithEmailAndPass,
  startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('pruenas en AuthThunks', () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe invocar el checkingCredentials', async () => {
    // console.log(checkingCredentials()); // { type: 'auth/checkingCredentials', payload: undefined }

    await chekingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  // // // startGoogleSignIng
  test('startGoogleSignIng debe llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };

    // simular el resolve (promise) de la funtion mockeada
    await signInWithGoogle.mockResolvedValue(loginData);

    // // thunk a testear:
    await startGoogleSignIng()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIng debe llamar checkingCredentials y login - Error', async () => {
    const errorMessage = 'Some error message!';
    const loginData = { ok: false, errorMessage };

    // simular la respuesta de la funtion mockeada
    await signInWithGoogle.mockResolvedValue(loginData);

    // // thunk a testear:
    await startGoogleSignIng()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  // // // startLoginWithEmailAndPass
  test('startLoginWithEmailAndPass debe llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };
    const email = demoUser.email,
      password = '123123';

    await loginWithEmailAndPass.mockResolvedValue(loginData);

    // thunk
    await startLoginWithEmailAndPass(email, password)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLoginWithEmailAndPass debe llamar checkingCredentials y login - Error', async () => {
    const errorMessage = 'Some error message!';
    const loginData = { ok: false, errorMessage };
    const email = demoUser.email,
      password = '123123';

    await loginWithEmailAndPass.mockResolvedValue(loginData);

    // thunk
    await startLoginWithEmailAndPass(email, password)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  // // // startCreatingUserWithEmailPassword
  test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = {
      displayName: demoUser.displayName,
      email: demoUser.email,
      password: demoUser.password,
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    // thunk
    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y login - Error', async () => {
    const errorMessage = 'Some error message!';
    const loginData = { ok: false, errorMessage };
    const formData = {
      displayName: demoUser.displayName,
      email: demoUser.email,
      password: demoUser.password,
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    // thunk
    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage }));
  });

  // // // startLogout
  test('startLogout debe llamar logoutFirebase, clearNotesLogout, logout', async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
