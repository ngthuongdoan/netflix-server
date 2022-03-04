import { Schema, SchemaTypes, model } from 'mongoose';
import { toJSON } from './plugins';
import { Token, TokenTypes } from 'types/Token';

const tokenSchema = new Schema<Token>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: TokenTypes,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// tokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
export const TokenModel = model('Token', tokenSchema);
