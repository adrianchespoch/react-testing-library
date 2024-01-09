import jwt from 'jsonwebtoken';

import { SECRETORKEY_JWT } from '../config/index.js';

// export const genJWT = id =>
//   jwt.sign({ id }, SECRETORKEY_JWT, { expiresIn: '24h' });

export const genJWT = id => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, SECRETORKEY_JWT, { expiresIn: '2h' }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token!');
      }

      resolve(token);
    });
  });
};
