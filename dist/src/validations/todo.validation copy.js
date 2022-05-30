"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.getTodo = exports.createTodo = void 0;
var joi_1 = __importDefault(require("joi"));
var status_1 = require("../config/status");
var objectId = function (value, helpers) {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message({
            messages: '"{{#label}}" must be a valid mongo id',
        });
    }
    return value;
};
var createTodo = {
    body: joi_1.default.object().keys({
        title: joi_1.default.string().required().trim(),
        description: joi_1.default.string().trim(),
        time: joi_1.default.date().required(),
        status: (_a = joi_1.default.string())
            .valid.apply(_a, Object.values(status_1.status)).default('none'),
    }),
};
exports.createTodo = createTodo;
var getTodos = {
//   query: Joi.object().keys({
//     name: Joi.string(),
//     role: Joi.string(),
//     sortBy: Joi.string(),
//     limit: Joi.number().integer(),
//     page: Joi.number().integer(),
//   }),
};
exports.getTodos = getTodos;
var getTodo = {
    params: joi_1.default.object().keys({
        id: joi_1.default.string().custom(objectId),
    }),
};
exports.getTodo = getTodo;
var updateTodo = {
    params: joi_1.default.object().keys({
        id: joi_1.default.required().custom(objectId),
    }),
    body: joi_1.default.object()
        .keys({
        title: joi_1.default.string().trim(),
        description: joi_1.default.string().trim(),
        time: joi_1.default.date(),
        status: (_b = joi_1.default.string())
            .valid.apply(_b, Object.values(status_1.status)).default('none'),
    })
        .min(1),
};
exports.updateTodo = updateTodo;
var deleteTodo = {
    params: joi_1.default.object().keys({
        id: joi_1.default.string().custom(objectId),
    }),
};
exports.deleteTodo = deleteTodo;
