"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var joi_1 = __importDefault(require("joi"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
var envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().valid('production', 'development', 'test').required(),
    PORT: joi_1.default.number().default(5000),
    MONGODB_URL: joi_1.default.string().required().description('Mongo DB url'),
    TMDB_API_URL: joi_1.default.string().required().description('TMDB url'),
    TMDB_API_KEY: joi_1.default.string().required().description('TMDB url'),
})
    .unknown();
// Extract validated value for process.env
var _a = envVarsSchema
    .prefs({
    errors: { label: 'key' },
})
    .validate(process.env), envVars = _a.value, error = _a.error;
if (error) {
    throw new Error("Config validation error: " + error.message);
}
exports.default = {
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
