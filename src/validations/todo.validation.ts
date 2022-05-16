import { customObjectIdValidation } from '../utils/customObjectIdValidation';
import Joi from 'joi';
import { status } from '../config/status';

const createTodo = {
  body: Joi.object().keys({
    title: Joi.string().required().trim(),
    description: Joi.string().trim(),
    time: Joi.date().required(),
    status: Joi.string()
      .valid(...Object.values(status))
      .default('none'),
  }),
};

const getTodos = {};

const getTodo = {
  params: Joi.object().keys({
    id: Joi.string().custom(customObjectIdValidation),
  }),
};

const updateTodo = {
  params: Joi.object().keys({
    id: Joi.required().custom(customObjectIdValidation),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().trim(),
      description: Joi.string().trim(),
      time: Joi.date(),
      status: Joi.string()
        .valid(...Object.values(status))
        .default('none'),
    })
    .min(1),
};

const deleteTodo = {
  params: Joi.object().keys({
    id: Joi.string().custom(customObjectIdValidation),
  }),
};

export { createTodo, getTodo, getTodos, updateTodo, deleteTodo };
