"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonController = exports.todoController = void 0;
var todo_controller_1 = __importDefault(require("./todo.controller"));
exports.todoController = todo_controller_1.default;
var common_controller_1 = __importDefault(require("./common.controller"));
exports.commonController = common_controller_1.default;
