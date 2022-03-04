import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { Environment } from 'config/env';
import logger from 'config/logger';
import ApiError from 'utils/ApiError';
import { NextFunction, Request, Response } from 'express';

export const errorConverter = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    // const statusCode =
    //   error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    // const message = error.message || httpStatus[statusCode];
    // error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  if (Environment.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR] as string;
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(Environment.env === 'development' && { stack: err.stack }),
  };

  if (Environment.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode as number).send(response);
};
