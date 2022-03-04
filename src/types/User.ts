import { ObjectId } from 'mongoose';

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}

export type User = {
  id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  isEmailVerified: boolean;
};
