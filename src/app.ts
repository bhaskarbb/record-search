import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { SERVER_CONFIG } from './config';
import { initializeRoutes } from './routes';

const { BODY_LIMIT, CORS_ORIGIN, CORS_METHODS } = SERVER_CONFIG;
const app = express();

// Middleware Initializations
app.use(pino());
app.use(cors({ origin: CORS_ORIGIN, methods: CORS_METHODS }));
app.use(express.json({ limit: BODY_LIMIT }));
app.use(express.urlencoded({ limit: BODY_LIMIT, extended: true }));

// Initialize Routes
initializeRoutes(app);

export default app;
