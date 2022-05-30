import { commonController } from '../controllers';
import validate from '../middlewares/validate';
import { commonValidation } from '../validations';
import { Router } from 'express';

// /common
const router = Router();

/**
 * /common/trending
 */
router.route('/trending').get(validate(commonValidation.getTrending), commonController.getTrending);
router.route('/upcoming').get(validate(commonValidation.getUpcoming), commonController.getUpcoming);

export default router;
