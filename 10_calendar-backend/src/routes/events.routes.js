import { Router } from 'express';

import {
  newEventRules,
  protectWithJwt,
  updateEventRules,
} from '../middlewares/index.js';
import {
  createEvent,
  deleteEvent,
  getCalendarEvents,
  updateEvent,
} from '../controllers/index.js';

const router = Router();

// Protect all routes
router.use(protectWithJwt);

router.route('/').get(getCalendarEvents).post(newEventRules(), createEvent);

router
  .route('/:id')
  .put(updateEventRules(), updateEvent)
  .delete(updateEventRules(), deleteEvent);

export default router;
