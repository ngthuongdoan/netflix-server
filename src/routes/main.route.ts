import { Router } from 'express';
import httpStatus from 'http-status';

const router = Router();
router.route('/').get((req, res, next) => {
  res.status(200).send('<h1>Hi</h1>');
});

router.route('/check-health').get((req, res, next) => {
  res.status(200).send({ message: httpStatus[200] });
});

export default router;
