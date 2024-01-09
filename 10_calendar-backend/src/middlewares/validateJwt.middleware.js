import jwt from 'jsonwebtoken';

import { User } from '../models/index.js';
import { SECRETORKEY_JWT } from '../config/index.js';

export const protectWithJwt = async (req, res, next) => {
  const bearerToken = req.header('Authorization');
  if (!bearerToken || !bearerToken.startsWith('Bearer'))
    return res.status(401).json({ ok: false, msg: 'Invalid token!' });

  const tokenJwt = bearerToken.split(' ')[1];

  try {
    const { id } = jwt.verify(tokenJwt, SECRETORKEY_JWT);
    const user = await User.findById(id).select('name email');

    if (!user)
      return res.status(401).json({ ok: false, msg: 'Invalid token!' });

    req.authenticatedUser = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ ok: false, msg: 'Invalid token!' });
  }
};
