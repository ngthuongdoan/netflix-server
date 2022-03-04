import { ObjectId } from 'mongoose';
export enum TokenTypes {
  ACCESS = 'access',
  REFRESH = 'refresh',
  RESET_PASSWORD = 'resetPassword',
  VERIFY_EMAIL = 'verifyEmail',
}

export type Token = {
  _id: ObjectId;
  user: ObjectId;
  type: TokenTypes;
  expires: Date;
  blacklisted: boolean;
};
