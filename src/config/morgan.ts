import { ServerResponse } from 'http';
import morgan from 'morgan';
import logger from './logger';

morgan.token('message', (_, res: any) => res.locals.errorMessage || '');

const successResponseFormat = `:method :url :status - :response-time ms`;
const errorResponseFormat = `:method :url :status - :response-time ms - message :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (_, res) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (_, res: ServerResponse) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) },
});

export { successHandler, errorHandler };
