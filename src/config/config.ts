import { Environment } from '../types/env';
import dotenv from 'dotenv';
import Joi, { ValidationResult } from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object<Environment>()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(5000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    TMDB_API_URL: Joi.string().required().description('TMDB url'),
    TMDB_API_KEY: Joi.string().required().description('TMDB url'),
  })
  .unknown();

// Extract validated value for process.env
const { value: envVars, error } = <Omit<ValidationResult, 'value'> & { value: Environment }>envVarsSchema
  .prefs({
    errors: { label: 'key' },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    // Using for test
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  TMDB: {
    apiKey: envVars.TMDB_API_KEY,
    url: envVars.TMDB_API_URL,
  },
};
