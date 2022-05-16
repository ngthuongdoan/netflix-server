import { Router } from 'express';
import todoRoutes from './todo.route';
import mainRoutes from './main.route';
import commonRoutes from './common.route';

const router = Router();
const defaultRoutes = [
  {
    path: '/',
    routes: mainRoutes,
  },
  {
    path: '/todo',
    routes: todoRoutes,
  },
  {
    path: '/common',
    routes: commonRoutes,
  },
];

defaultRoutes.forEach((r) => {
  router.use(r.path, r.routes);
});

export default router;
