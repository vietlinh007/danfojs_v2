"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toExcel = exports.$readExcel = void 0;
var __1 = require("../../");
var xlsx_1 = require("xlsx");
/**
 * Reads a JSON file from local or remote location into a DataFrame.
 * @param file URL or local file path to JSON file.
 * @param options Configuration object. Supported options:
 * - `method`: The HTTP method to use. Defaults to `'GET'`.
 * - `headers`: Additional headers to send with the request. Supports the `node-fetch` [HeadersInit]
 * @example
 * ```
 * import { readExcel } from "danfojs-node"
 * const df = await readExcel("https://raw.githubusercontent.com/test.xlsx")
 * ```
 * @example
 * ```
 * import { readExcel } from "danfojs-node"
 * const df = await readExcel("https://raw.githubusercontent.com/test.xlsx", {
 *    method: "GET",
 *    headers: {
 *      Accept: "text/csv",
 *      Authorization: "Bearer YWRtaW46YWRtaW4="
 *    }
 * })
 * ```
 */
var $readExcel = function (file, options) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sheet, method, headers, frameConfig, parsingOptions, arrBuf, arrBufInt8, workbook, worksheet, data, df;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = __assign({ sheet: 0, method: "GET", headers: {}, frameConfig: {}, parsingOptions: {} }, options), sheet = _a.sheet, method = _a.method, headers = _a.headers, frameConfig = _a.frameConfig, parsingOptions = _a.parsingOptions;
                if (!(typeof file === "string" && file.startsWith("http"))) return [3 /*break*/, 1];
                return [2 /*return*/, new Promise(function (resolve) {
                        fetch(file, { method: method, headers: headers }).then(function (response) {
                            if (response.status !== 200) {
                                throw new Error("Failed to load ".concat(file));
                            }
                            response.arrayBuffer().then(function (arrBuf) {
                                var arrBufInt8 = new Uint8Array(arrBuf);
                                var workbook = (0, xlsx_1.read)(arrBufInt8, __assign({ type: "array" }, parsingOptions));
                                var worksheet = workbook.Sheets[workbook.SheetNames[sheet]];
                                var data = xlsx_1.utils.sheet_to_json(worksheet);
                                var df = new __1.DataFrame(data, frameConfig);
                                resolve(df);
                            });
                        }).catch(function (err) {
                            throw new Error(err);
                        });
                    })];
            case 1:
                if (!(file instanceof File)) return [3 /*break*/, 3];
                return [4 /*yield*/, file.arrayBuffer()];
            case 2:
                arrBuf = _b.sent();
                arrBufInt8 = new Uint8Array(arrBuf);
                workbook = (0, xlsx_1.read)(arrBufInt8, __assign({ type: "array" }, parsingOptions));
                worksheet = workbook.Sheets[workbook.SheetNames[sheet]];
                data = xlsx_1.utils.sheet_to_json(worksheet);
                df = new __1.DataFrame(data, frameConfig);
                return [2 /*return*/, df];
            case 3: throw new Error("ParamError: File not supported. file must be a url or an input File object");
        }
    });
}); };
exports.$readExcel = $readExcel;
/**
 * Converts a DataFrame or Series to Excel Sheet.
 * @param df DataFrame or Series to be converted to JSON.
 * @param options Configuration object. Supported options:
 * - `sheetName`: The sheet name to be written to. Defaults to `'Sheet1'`.
 * - `fileName`: The file to be written to. Defaults to `'./output.xlsx'`.
 * @example
 * ```
 * import { toExcel } from "danfojs-node"
 * const df = new DataFrame([[1, 2, 3], [4, 5, 6]])
 * toExcel(df, {
 *     fileName: "./data/sample.xlsx",
 *     sheetName: "MySheet",
 *   })
 * ```
 */
var $toExcel = function (df, options) {
    var _a = __assign({ fileName: "./output.xlsx", sheetName: "Sheet1" }, options), fileName = _a.fileName, sheetName = _a.sheetName, writingOptions = _a.writingOptions;
    if (!(fileName.endsWith(".xlsx"))) {
        fileName = fileName + ".xlsx";
    }
    var data;
    if (df.$isSeries) {
        var row = df.values;
        var col = df.columns;
        data = __spreadArray([col], (row.map(function (x) { return [x]; })), true);
    }
    else {
        var row = df.values;
        var cols = df.columns;
        data = __spreadArray([cols], row, true);
    }
    var worksheet = xlsx_1.utils.aoa_to_sheet(data);
    var wb = xlsx_1.utils.book_new();
    xlsx_1.utils.book_append_sheet(wb, worksheet, sheetName);
    (0, xlsx_1.writeFile)(wb, "".concat(fileName), writingOptions);
};
exports.$toExcel = $toExcel;
