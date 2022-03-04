import { NextFunction, Request } from 'express';
import { User } from 'types/User';

const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

export const verifyCallback =
  (req: Request, resolve: Function, reject: Function, requiredRights: any) =>
  async (err: Error, user: User, info: string) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    if (requiredRights.length) {
      // const userRights = roleRights.get(user.role);
      // const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
      // if (!hasRequiredRights && req.params.userId !== user.id) {
      //   return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
      // }
    }

    resolve();
  };

export const auth =
  (...requiredRights: Array<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };
