import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { commonService, todoService } from '../services';

const getTrending: RequestHandler = async (_, res) => {
  try {
    const result = await commonService.getTrending();
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    res.status(error.statusCode).send({ message: httpStatus[error.statusCode] });
  }
};

const getUpcoming: RequestHandler = async (_, res) => {
  try {
    const result = await commonService.getUpcoming();
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    res.status(error.statusCode).send({ message: httpStatus[error.statusCode] });
  }
};

export default {
  getTrending,
  getUpcoming,
};
