import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Alert,
} from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const initFormData = {
  displayName: '',
  email: '',
  password: '',
};

const formValidations = {
  email: [value => value.includes('@'), 'El correo debe tener una @'],
  password: [
    value => value.length >= 6,
    'El password debe tener mas de 6 caracteres!',
  ],
  displayName: [value => value.length >= 1, 'El nombre es obligatorio'],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuth = useMemo(() => {
    status === 'checking';
  }, [status]);

  const {
    displayName,
    email,
    password,
    handleInputChange,
    formValues,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(initFormData, formValidations);

  const handleSubmit = e => {
    e.preventDefault();

    // Form validations
    setFormSubmited(true);
    if (!isFormValid) return;

    // Peticion a firebase para crear user con email & pass
    dispatch(startCreatingUserWithEmailPassword(formValues));
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
        <h1>FormValid: {isFormValid ? 'Valid' : 'Invalid'}</h1>

        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              placeholder="John Doe"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={handleInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={formSubmited && displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="test@test.com"
              fullWidth
              name="email"
              value={email}
              onChange={handleInputChange}
              error={!!emailValid && formSubmited}
              helperText={formSubmited && emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={password}
              onChange={handleInputChange}
              error={!!passwordValid && formSubmited}
              helperText={formSubmited && passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/* {errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )} */}
            {/* Testing:  */}
            <Grid item xs={12} display={errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuth}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
