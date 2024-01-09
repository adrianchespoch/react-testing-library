import { body, param, validationResult } from 'express-validator';

import { doesItExist, isAlreadyRegistered } from '../helpers/index.js';
import { checkLoginCredentials } from './index.js';

export const validate = (req, res, next) => {
  /*   const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  return next(); */

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ ok: false, errors: errors.mapped() });

  return next();
};

// Auth
export const emailPassRules = () => [
  body('email', 'Invalid email!').isEmail(),
  body('password', 'Password must be longer than 6 characters!').isLength({
    min: 6,
  }),
];

export const signUpRules = () => [
  body('name', 'Invalid name!').notEmpty(),
  ...emailPassRules(),
  validate,

  body('email').custom(email => isAlreadyRegistered(email, 'user')),
  validate,
];

export const loginRules = () => [
  ...emailPassRules(),
  validate,
  checkLoginCredentials,
];

// Calendar events
export const newEventRules = () => [
  body('title', 'Title is required!').not().isEmpty(),
  // TODO: Validar fechas
  // body('start', 'Initial date is required!').isDate(),
  // body('end', 'Finish date is required!').isDate(),
  body('start', 'Initial date is required!').not().isEmpty(),
  body('end', 'Finish date is required!').notEmpty(),
  validate,
];

export const updateEventRules = () => [
  param('id', 'Invalid MongoDB ID!').isMongoId(),
  param('id').custom(id => doesItExist(id, 'event')),
  validate,
];
