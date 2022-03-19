import { Router } from 'express';
import todoRoutes from './todo.route';

const router = Router();
const defaultRoutes = [
  {
    path: '/todo',
    routes: todoRoutes,
  },
];

defaultRoutes.forEach((r) => {
  router.use(r.path, r.routes);
});

export default router;
