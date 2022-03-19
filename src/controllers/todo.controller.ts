import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { todoService } from '../services';

const createTodo: RequestHandler = async (req, res, next) => {
  try {
    const todo = await todoService.createTodo(req.body);
    res.status(httpStatus.CREATED).send(todo);
  } catch (error) {
    next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};

const getTodos: RequestHandler = async (_, res) => {
  const result = await todoService.queryTodos();
  res.send(result);
};

const getTodo: RequestHandler = async (req, res) => {
  const todo = await todoService.getTodoById(req.params.id);
  if (!todo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Todo not found');
  }
  res.send(todo);
};

const updateTodo: RequestHandler = async (req, res) => {
  const todo = await todoService.updateTodoById(req.params.id, req.body);
  res.send(todo);
};

const deleteTodo: RequestHandler = async (req, res) => {
  await todoService.deleteTodoById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
};

export default {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
