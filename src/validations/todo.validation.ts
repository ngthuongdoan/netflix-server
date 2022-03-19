import Joi, { CustomHelpers, LanguageMessages } from 'joi';
import { status } from '../config/status';

const objectId = (value: string, helpers: CustomHelpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message(<LanguageMessages>{
      messages: '"{{#label}}" must be a valid mongo id',
    });
  }
  return value;
};

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

const getTodos = {
  //   query: Joi.object().keys({
  //     name: Joi.string(),
  //     role: Joi.string(),
  //     sortBy: Joi.string(),
  //     limit: Joi.number().integer(),
  //     page: Joi.number().integer(),
  //   }),
};

const getTodo = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateTodo = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
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
    id: Joi.string().custom(objectId),
  }),
};

export { createTodo, getTodo, getTodos, updateTodo, deleteTodo };
