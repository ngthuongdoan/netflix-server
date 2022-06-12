"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todo_route_1 = __importDefault(require("./todo.route"));
var main_route_1 = __importDefault(require("./main.route"));
var common_route_1 = __importDefault(require("./common.route"));
var router = express_1.Router();
var defaultRoutes = [
    {
        path: '/',
        routes: main_route_1.default,
    },
    {
        path: '/todo',
        routes: todo_route_1.default,
    },
    {
        path: '/common',
        routes: common_route_1.default,
    },
];
defaultRoutes.forEach(function (r) {
    router.use(r.path, r.routes);
});
exports.default = router;
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
