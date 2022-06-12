import { Router } from 'express';
import httpStatus from 'http-status';

const router = Router();

router.route('/').get((req, res, next) => {
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
router.route('/check-health').get((req, res, next) => {
  res.status(200).send({ message: httpStatus[200] });
});

export default router;
