import dotenv from 'dotenv';
dotenv.config();
import { Server } from 'http';
import app from './app';
import config from './config/config';
import logger from './config/logger';
import mongoose from 'mongoose';
import ApiError from './utils/ApiError';
import axios from 'axios';
import { GLOBAL } from './constants/global';

let server: Server;
(async () => {
  try {
    logger.info('Connecting to TMDB');
    await import('./config/axios');
    const response = await axios.get<{ request_token: string; expires_at: string }>('/authentication/token/new');
    if (response.status === 200 && response.data) {
      app.set(GLOBAL.TOKEN, response.data.request_token);
      logger.info('Connected to TMDB');
    }
  } catch (error) {
    logger.error('Failed to connect to TMDB');
  }
})();

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: ApiError | Error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
