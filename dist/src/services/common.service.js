"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpcoming = exports.getTrending = void 0;
var axios_1 = __importDefault(require("axios"));
var query_string_1 = __importDefault(require("query-string"));
var http_status_1 = __importDefault(require("http-status"));
var ApiError_1 = __importDefault(require("../utils/ApiError"));
/**
 * Get trending
 * @link https://developers.themoviedb.org/3/trending/get-trending
 * @param media_type
 * @param time_window
 * @returns
 */
var getTrending = function (media_type, time_window) {
    if (media_type === void 0) { media_type = 'all'; }
    if (time_window === void 0) { time_window = 'week'; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("/trending/" + media_type + "/" + time_window)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_1 = _a.sent();
                    throw new ApiError_1.default(http_status_1.default.NOT_FOUND, error_1);
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getTrending = getTrending;
/**
 * Get upcoming
 * @link https://developers.themoviedb.org/3/movies/get-upcoming
 * @param  {string} language
 * @param  {number} page
 * @param  {string} region
 * @returns
 */
var getUpcoming = function (language, page, region) {
    if (language === void 0) { language = 'en-US'; }
    if (page === void 0) { page = 1; }
    if (region === void 0) { region = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var query, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = query_string_1.default.stringifyUrl({
                        url: '/movie/upcoming',
                        query: {
                            language: language,
                            page: page,
                            region: region,
                        },
                    }, {
                        skipNull: true,
                        skipEmptyString: true,
                    });
                    return [4 /*yield*/, axios_1.default.get(query)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_2 = _a.sent();
                    throw new ApiError_1.default(http_status_1.default.NOT_FOUND, error_2);
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getUpcoming = getUpcoming;
