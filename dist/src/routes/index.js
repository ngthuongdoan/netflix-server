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
