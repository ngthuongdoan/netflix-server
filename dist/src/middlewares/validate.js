"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var http_status_1 = __importDefault(require("http-status"));
var pick_1 = __importDefault(require("../utils/pick"));
var ApiError_1 = __importDefault(require("../utils/ApiError"));
/**
 * @param  {} schema
 * @param  {} =>(req
 * @param  {} res
 * @param  {} next
 */
var validate = function (schema) {
    return function (req, res, next) {
        var validSchema = pick_1.default(schema, ['params', 'query', 'body']);
        var object = pick_1.default(req, Object.keys(validSchema));
        var _a = joi_1.default.compile(validSchema)
            .prefs({ errors: { label: 'key' } })
            .validate(object), value = _a.value, error = _a.error;
        if (error) {
            var errorMessage = error.details
                .map(function (details) { return details.message; })
                .join(', ');
            return next(new ApiError_1.default(http_status_1.default.BAD_REQUEST, errorMessage));
        }
        Object.assign(req, value);
        return next();
    };
};
exports.default = validate;
