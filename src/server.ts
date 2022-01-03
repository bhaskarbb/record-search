import dotenv from 'dotenv';

// dotenv config to be called as early in application as possible
dotenv.config();

import app from './app';
import mongoose from 'mongoose';
import { MONGO_CONFIG, SERVER_CONFIG } from './config';
import { logger } from './utils';

const { MONGO_URI } = MONGO_CONFIG;
const { PORT } = SERVER_CONFIG;

// Connect to database
mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info('MongoDB conencted');
  })
  .catch((error) => {
    logger.fatal(`MongoDB connection error. ${error}`);
    process.exit(1);
  });

// Start express server
const server = app.listen(PORT, () => {
  logger.info(`App is running on ${PORT} in ${app.get('env')} mode`);
});

export default server;
