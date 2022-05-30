"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
var http_status_1 = __importDefault(require("http-status"));
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = __importDefault(require("../config/logger"));
var ApiError_1 = __importDefault(require("../utils/ApiError"));
var errorConverter = function (err, req, res, next) {
    var error = err;
    if (!(error instanceof ApiError_1.default)) {
        var statusCode = error.statusCode || error instanceof mongoose_1.default.Error
            ? http_status_1.default.BAD_REQUEST
            : http_status_1.default.INTERNAL_SERVER_ERROR;
        var message = error.message || http_status_1.default[statusCode];
        error = new ApiError_1.default(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
// eslint-disable-next-line no-unused-vars
var errorHandler = function (err, req, res, next) {
    var statusCode = err.statusCode, message = err.message;
    if (!err.isOperational) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR];
    }
    res.locals.errorMessage = err.message;
    var response = __assign({ code: statusCode, message: message }, { stack: err.stack });
    console.log(err);
    logger_1.default.error(err);
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
