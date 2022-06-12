"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_status_1 = __importDefault(require("http-status"));
var router = express_1.Router();
router.route('/').get(function (req, res, next) {
    res.status(200).send('<h1>Hi</h1>');
});
/**
 * @swagger
 *
 * /check-health:
 *   get:
 *     summary: Healthcheck endpoint to verify that service is running and able to accept new connections
 *     security: []
 *     produces:
 *       - "text/plain"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.route('/check-health').get(function (req, res, next) {
    res.status(200).send({ message: http_status_1.default[200] });
});
exports.default = router;
