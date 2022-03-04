import httpStatus from 'http-status';
import * as tokenService from './token.service';
import * as userService from './user.service';
import ApiError from 'utils/ApiError';
import { TokenModel } from 'models/token.model';
import { TokenTypes } from 'types/Token';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
export const loginUserWithEmailAndPassword = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
export const logout = async (refreshToken: string) => {
  const refreshTokenDoc = await TokenModel.findOne({ token: refreshToken, type: TokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
export const refreshAuth = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, TokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
export const resetPassword = async (resetPasswordToken: string, newPassword: string) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, TokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await TokenModel.deleteMany({ user: user.id, type: TokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
export const verifyEmail = async (verifyEmailToken: string) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, TokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await TokenModel.deleteMany({ user: user.id, type: TokenModel.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};
