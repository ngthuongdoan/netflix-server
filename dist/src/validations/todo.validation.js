"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.getTodo = exports.createTodo = void 0;
var customObjectIdValidation_1 = require("../utils/customObjectIdValidation");
var joi_1 = __importDefault(require("joi"));
var status_1 = require("../config/status");
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
var getTodos = {};
exports.getTodos = getTodos;
var getTodo = {
    params: joi_1.default.object().keys({
        id: joi_1.default.string().custom(customObjectIdValidation_1.customObjectIdValidation),
    }),
};
exports.getTodo = getTodo;
var updateTodo = {
    params: joi_1.default.object().keys({
        id: joi_1.default.required().custom(customObjectIdValidation_1.customObjectIdValidation),
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
        id: joi_1.default.string().custom(customObjectIdValidation_1.customObjectIdValidation),
    }),
};
exports.deleteTodo = deleteTodo;
