import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import httpStatus from 'http-status';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import ApiError from './utils/ApiError';
import { errorConverter, errorHandler } from './middlewares/error';
import * as morgan from './config/morgan';

const app = express();

app.use(helmet());

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
// gzip compression
app.use(compression());

app.use(cors());
// app.options('*', cors());

app.use('/', routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
