import httpStatus from 'http-status';
import { Todo } from '../models';
import ApiError from '../utils/ApiError';

const createTodo = async (todoBody: any) => {
  try {
    const todo = await Todo.create(todoBody);
    return todo;
  } catch (error) {
    throw error;
  }
};

const queryTodos = async () => {
  const todos = await Todo.find({});
  return todos;
};

const getTodoById = async (id: string) => {
  return Todo.findById(id);
};

const updateTodoById = async (id: string, updateBody: any) => {
  const todo = await getTodoById(id);
  if (!todo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Todo not found');
  }
  Object.assign(todo, updateBody);
  await todo.save();
  return todo;
};

const deleteTodoById = async (id: string) => {
  const todo = await getTodoById(id);
  if (!todo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Todo not found');
  }
  await todo.remove();
  return todo;
};

export { createTodo, getTodoById, queryTodos, updateTodoById, deleteTodoById };
