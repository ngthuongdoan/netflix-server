"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("mongoose"));
var http_status_1 = __importDefault(require("http-status"));
var node_mocks_http_1 = __importDefault(require("node-mocks-http"));
var error_1 = require("../../../src/middlewares/error");
var ApiError_1 = __importDefault(require("../../../src/utils/ApiError"));
var config_1 = __importDefault(require("../../../src/config/config"));
var logger_1 = __importDefault(require("../../../src/config/logger"));
describe('Error middlewares', function () {
    describe('Error converter', function () {
        test('should return the same ApiError object it was called with', function () {
            var error = new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Any error');
            var next = jest.fn();
            error_1.errorConverter(error, node_mocks_http_1.default.createRequest(), node_mocks_http_1.default.createResponse(), next);
            expect(next).toHaveBeenCalledWith(error);
        });
        test('should convert an Error to ApiError and preserve its status and message', function () {
            var error = new Error('Any error');
            error.statusCode = http_status_1.default.BAD_REQUEST;
            var next = jest.fn();
            error_1.errorConverter(error, node_mocks_http_1.default.createRequest(), node_mocks_http_1.default.createResponse(), next);
            expect(next).toHaveBeenCalledWith(expect.any(ApiError_1.default));
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                statusCode: error.statusCode,
                message: error.message,
                isOperational: false,
            }));
        });
        test('should convert an Error without status to ApiError with status 500', function () {
            var error = new Error('Any error');
            var next = jest.fn();
            error_1.errorConverter(error, node_mocks_http_1.default.createRequest(), node_mocks_http_1.default.createResponse(), next);
            expect(next).toHaveBeenCalledWith(expect.any(ApiError_1.default));
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: error.message,
                isOperational: false,
            }));
        });
        test('should convert an Error without message to ApiError with default message of that http status', function () {
            var error = new Error();
            error.statusCode = http_status_1.default.BAD_REQUEST;
            var next = jest.fn();
            error_1.errorConverter(error, node_mocks_http_1.default.createRequest(), node_mocks_http_1.default.createResponse(), next);
            expect(next).toHaveBeenCalledWith(expect.any(ApiError_1.default));
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                statusCode: error.statusCode,
                message: http_status_1.default[error.statusCode],
                isOperational: false,
            }));
        });
        test('should convert a Mongoose error to ApiError with status 400 and preserve its message', function () {
            var error = new mongoose.Error('Any mongoose error');
            var next = jest.fn();
            error_1.errorConverter(error, node_mocks_http_1.default.createRequest(), node_mocks_http_1.default.createResponse(), next);
            expect(next).toHaveBeenCalledWith(expect.any(ApiError_1.default));
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                statusCode: http_status_1.default.BAD_REQUEST,
                message: error.message,
                isOperational: false,
            }));
        });
        test('should convert any other object to ApiError with status 500 and its message', function () {
            var error = {};
            var next = jest.fn();
            error_1.errorConverter(error, node_mocks_http_1.default.createRequest(), node_mocks_http_1.default.createResponse(), next);
            expect(next).toHaveBeenCalledWith(expect.any(ApiError_1.default));
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR],
                isOperational: false,
            }));
        });
    });
    describe('Error handler', function () {
        beforeEach(function () {
            jest.spyOn(logger_1.default, 'error').mockImplementation();
        });
        test('should send proper error response and put the error message in res.locals', function () {
            var error = new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Any error');
            var res = node_mocks_http_1.default.createResponse();
            var sendSpy = jest.spyOn(res, 'send');
            error_1.errorHandler(error, node_mocks_http_1.default.createRequest(), res, function () { });
            expect(sendSpy).toHaveBeenCalledWith(expect.objectContaining({
                code: error.statusCode,
                message: error.message,
            }));
            expect(res.locals.errorMessage).toBe(error.message);
        });
        test('should put the error stack in the response if in development mode', function () {
            config_1.default.env = 'development';
            var error = new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Any error');
            var res = node_mocks_http_1.default.createResponse();
            var sendSpy = jest.spyOn(res, 'send');
            error_1.errorHandler(error, node_mocks_http_1.default.createRequest(), res, function () { });
            expect(sendSpy).toHaveBeenCalledWith(expect.objectContaining({
                code: error.statusCode,
                message: error.message,
                stack: error.stack,
            }));
            config_1.default.env = process.env.NODE_ENV;
        });
        test('should send internal server error status and message if in production mode and error is not operational', function () {
            config_1.default.env = 'production';
            var error = new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Any error', false);
            var res = node_mocks_http_1.default.createResponse();
            var sendSpy = jest.spyOn(res, 'send');
            error_1.errorHandler(error, node_mocks_http_1.default.createRequest(), res, function () { });
            expect(sendSpy).toHaveBeenCalledWith(expect.objectContaining({
                code: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR],
            }));
            expect(res.locals.errorMessage).toBe(error.message);
            config_1.default.env = process.env.NODE_ENV;
        });
        test('should preserve original error status and message if in production mode and error is operational', function () {
            config_1.default.env = 'production';
            var error = new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Any error');
            var res = node_mocks_http_1.default.createResponse();
            var sendSpy = jest.spyOn(res, 'send');
            error_1.errorHandler(error, node_mocks_http_1.default.createRequest(), res, function () { });
            expect(sendSpy).toHaveBeenCalledWith(expect.objectContaining({
                code: error.statusCode,
                message: error.message,
            }));
            config_1.default.env = process.env.NODE_ENV;
        });
    });
});
