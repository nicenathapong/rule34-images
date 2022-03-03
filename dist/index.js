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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var xml2js_1 = require("xml2js");
function praseResult(xml) {
    return new Promise(function (resolve) { return (0, xml2js_1.parseString)(xml, function (err, prase) { return resolve({ length: parseInt(prase.posts.$.count), images: prase.posts.post.map(function (p) { return p.$; }) }); }); });
}
function rule34(tags) {
    return __awaiter(this, void 0, void 0, function () {
        function generateRule34Links() {
            var links = new Array();
            for (var i = 0; i < Math.round(res.length / 1000); i++) {
                links.push("https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1000&pid=".concat(i + 1, "&tags=").concat(tags));
            }
            return links;
        }
        var result_1, _i, tags_1, _, _a, _b, data, isHave, res, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!Array.isArray(tags) && typeof tags !== 'string')
                        return [2 /*return*/, []];
                    if (!Array.isArray(tags)) return [3 /*break*/, 5];
                    result_1 = {};
                    _i = 0, tags_1 = tags;
                    _c.label = 1;
                case 1:
                    if (!(_i < tags_1.length)) return [3 /*break*/, 4];
                    _ = tags_1[_i];
                    _a = result_1;
                    _b = _;
                    return [4 /*yield*/, rule34(_)];
                case 2:
                    _a[_b] = _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, result_1];
                case 5: return [4 /*yield*/, axios_1.default.get("https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1000&pid=0&tags=".concat(tags))];
                case 6:
                    data = (_c.sent()).data;
                    return [4 /*yield*/, new Promise(function (resolve) { return (0, xml2js_1.parseString)(data, function (err, prase) { return prase.posts.$.count === '0' ? resolve(false) : resolve(true); }); })];
                case 7:
                    isHave = _c.sent();
                    if (!isHave)
                        return [2 /*return*/, []];
                    return [4 /*yield*/, praseResult(data)];
                case 8:
                    res = _c.sent();
                    if (res.length < 1000)
                        return [2 /*return*/, res.images];
                    return [4 /*yield*/, Promise.all(generateRule34Links().map(function (link) { return axios_1.default.get(link).then(function (_a) {
                            var data = _a.data;
                            return praseResult(data);
                        }); }))];
                case 9:
                    result = _c.sent();
                    return [2 /*return*/, [].concat.apply([], result.map(function (d) { return d.images; })).concat(res.images)];
            }
        });
    });
}
exports.default = rule34;
