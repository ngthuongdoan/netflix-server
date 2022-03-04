import jwt from 'jsonwebtoken';
import moment from 'moment';
import httpStatus from 'http-status';
import { Environment } from 'config/env';
import * as userService from './user.service';
import { TokenModel } from 'models/token.model';
import ApiError from 'utils/ApiError';
import { TokenTypes } from 'types/Token';
import { ObjectId } from 'mongoose';
import { User } from 'types/User';

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (
  userId: ObjectId,
  expires: moment.Moment,
  type: TokenTypes,
  secret = Environment.jwt.secret
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
export const saveToken = async (
  token: string,
  userId: ObjectId,
  expires: moment.Moment,
  type: TokenTypes,
  blacklisted: boolean = false
) => {
  const tokenDoc = await TokenModel.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
export const verifyToken = async (token: string, type: TokenTypes) => {
  const payload = jwt.verify(token, Environment.jwt.secret);
  const tokenDoc = await TokenModel.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
export const generateAuthTokens = async (user: User) => {
  const accessTokenExpires = moment().add(Environment.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, TokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(Environment.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, TokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, TokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
export const generateResetPasswordToken = async (email: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(Environment.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires, TokenTypes.RESET_PASSWORD);
  await saveToken(resetPasswordToken, user.id, expires, TokenTypes.RESET_PASSWORD);
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
export const generateVerifyEmailToken = async (user: User) => {
  const expires = moment().add(Environment.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user.id, expires, TokenTypes.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user.id, expires, TokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};
