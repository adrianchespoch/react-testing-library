import express from 'express';

import './db/db.js';
import { setupMiddlewares } from './middlewares/index.js';
import { authRouter, eventsRouter } from './routes/index.js';

// Initializations:
const app = express();

// Middlewares
setupMiddlewares(app);

// Router
app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);

export default app;
