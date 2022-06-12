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

// Global swagger defs:

/**
 * @swagger
 *
 * components:
 *   securitySchemes:
 *     basicAuth:
 *       type: http
 *       scheme: basic
 *
 * security:
 *   - basicAuth: []
 *
 * definitions:
 *   Environment:
 *     type: string
 *     minimum: 1
 *     enum:
 *       - dev
 *       - test
 *       - prod
 *
 *   PackageName:
 *     type: string
 *     minimum: 1
 *
 *   VersionNumber:
 *     type: string
 *     minimum: 1
 *
 *   Status:
 *     type: object
 *     properties:
 *       pkg:
 *         type: string
 *       env:
 *         type: string
 *       version:
 *         type: string
 *       previousVersion:
 *         type: string
 *       total:
 *         type: number
 *       error:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 *       complete:
 *         type: boolean
 *
 *   StatusEvent:
 *     type: object
 *     properties:
 *       pkg:
 *         type: string
 *       env:
 *         type: string
 *       version:
 *         type: string
 *       locale:
 *         type: string
 *       error:
 *         type: string
 *       message:
 *         type: string
 *       details:
 *         type: string
 *       createdAt:
 *         type: string
 *       eventId:
 *         type: string
 *
 *
 *   Progress:
 *      type: object
 *      properties:
 *        progress:
 *          type: number
 *        count:
 *          type: number
 *        total:
 *          type: number
 *
 */
