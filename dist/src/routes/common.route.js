"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = require("../controllers");
var validate_1 = __importDefault(require("../middlewares/validate"));
var validations_1 = require("../validations");
var express_1 = require("express");
// /common
var router = express_1.Router();
/**
 * /common/trending
 */
router.route('/trending').get(validate_1.default(validations_1.commonValidation.getTrending), controllers_1.commonController.getTrending);
router.route('/upcoming').get(validate_1.default(validations_1.commonValidation.getUpcoming), controllers_1.commonController.getUpcoming);
exports.default = router;
