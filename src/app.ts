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
import { GLOBAL } from './constants/global';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

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

app.set(GLOBAL.TOKEN, '');
app.use('/', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
