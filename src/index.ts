import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import { Environment } from './config/env';
import logger from './config/logger';

let server: Server;

(() => {
  mongoose.connect(Environment.mongoose.url, Environment.mongoose.options);
  logger.info('Connected to MongoDB');
  server = app.listen(Environment.port, () => {
    logger.info(`Listening to port ${Environment.port}`);
  });
})();

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

const unexpectedErrorHandler = (error: Error) => {
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
