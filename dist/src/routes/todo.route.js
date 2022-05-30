"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todo_controller_1 = __importDefault(require("../controllers/todo.controller"));
var validate_1 = __importDefault(require("../middlewares/validate"));
var validations_1 = require("../validations");
// Todo Routes /todo
var router = express_1.Router();
router
    .route('/')
    .get(validate_1.default(validations_1.todoValidation.getTodos), todo_controller_1.default.getTodos)
    .post(validate_1.default(validations_1.todoValidation.createTodo), todo_controller_1.default.createTodo);
router
    .route('/:id')
    .get(validate_1.default(validations_1.todoValidation.getTodo), todo_controller_1.default.getTodo)
    .patch(validate_1.default(validations_1.todoValidation.updateTodo), todo_controller_1.default.updateTodo)
    .delete(validate_1.default(validations_1.todoValidation.deleteTodo), todo_controller_1.default.deleteTodo);
exports.default = router;
