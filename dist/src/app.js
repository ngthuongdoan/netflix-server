"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var http_status_1 = __importDefault(require("http-status"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var xss_clean_1 = __importDefault(require("xss-clean"));
var compression_1 = __importDefault(require("compression"));
var ApiError_1 = __importDefault(require("./utils/ApiError"));
var error_1 = require("./middlewares/error");
var morgan = __importStar(require("./config/morgan"));
var global_1 = require("./constants/global");
var app = express_1.default();
app.use(helmet_1.default());
app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(xss_clean_1.default());
// gzip compression
app.use(compression_1.default());
app.use(cors_1.default());
// app.options('*', cors());
app.set(global_1.GLOBAL.TOKEN, '');
app.use('/', routes_1.default);
app.use(function (req, res, next) {
    next(new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(error_1.errorConverter);
// handle error
app.use(error_1.errorHandler);
exports.default = app;
