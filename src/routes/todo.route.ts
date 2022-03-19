import { Router } from 'express';
import todoController from '../controllers/todo.controller';
import validate from '../middlewares/validate';
import { todoValidation } from '../validations';

const router = Router();
router
  .route('/')
  .get(validate(todoValidation.getTodos), todoController.getTodos)
  .post(validate(todoValidation.createTodo), todoController.createTodo);
router
  .route('/:id')
  .get(validate(todoValidation.getTodo), todoController.getTodo)
  .patch(validate(todoValidation.updateTodo), todoController.updateTodo)
  .delete(validate(todoValidation.deleteTodo), todoController.deleteTodo);

export default router;
