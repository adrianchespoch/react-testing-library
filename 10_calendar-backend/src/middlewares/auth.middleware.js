'use strict';

import { User } from '../models/index.js';

export const checkLoginCredentials = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const matchPass = await user?.comparePassword(password);
  if (!user || !matchPass)
    return res.status(401).json({
      msg: 'Hubo un problema al iniciar sesión. Comprueba tu correo electrónico y contraseña o crea una cuenta.',
    });

  return next();
};

export const checkToken = async (req, res, next) => {
  const { token } = req.params;

  const unconfirmedUser = await User.findOne({ token });
  if (!unconfirmedUser) return res.status(401).json({ msg: 'Token inválido!' });

  return next();
};
