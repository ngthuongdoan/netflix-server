"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.successHandler = void 0;
var morgan_1 = __importDefault(require("morgan"));
var logger_1 = __importDefault(require("./logger"));
morgan_1.default.token('message', function (_, res) { return res.locals.errorMessage || ''; });
var successResponseFormat = ":method :url :status - :response-time ms";
var errorResponseFormat = ":method :url :status - :response-time ms - message :message";
var successHandler = morgan_1.default(successResponseFormat, {
    skip: function (_, res) { return res.statusCode >= 400; },
    stream: { write: function (message) { return logger_1.default.info(message.trim()); } },
});
exports.successHandler = successHandler;
var errorHandler = morgan_1.default(errorResponseFormat, {
    skip: function (_, res) { return res.statusCode < 400; },
    stream: { write: function (message) { return logger_1.default.error(message.trim()); } },
});
exports.errorHandler = errorHandler;
