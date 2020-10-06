#!/usr/bin/env node
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
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var StreamSearch = require("streamsearch");
/**
 * Helper function to sort array of objects by a property value
 * @param a an array item
 * @param b another array item
 */
var compareCounts = function (a, b) {
    return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0);
};
/**
 * load names from a file and get counts for each. Returns non-zero results.
 */
var processNames = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, names, uniqueNames, nameCountsRaw, nameCounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = fs_1.default.readFileSync(path_1.default.join(__dirname, '../inputs/first-names.txt'), 'utf8');
                names = data.split("\r");
                uniqueNames = Array.from(new Set(names));
                console.log("Loaded " + uniqueNames.length + " unique names begining with " +
                    (uniqueNames[0] + " and ending with " + uniqueNames[uniqueNames.length - 1]));
                console.log('Calculating occurrences of each name in text...');
                return [4 /*yield*/, Promise.all(uniqueNames.map(function (name) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, countName(name)];
                    }); }); }))];
            case 1:
                nameCountsRaw = _a.sent();
                nameCounts = nameCountsRaw
                    .reduce(function (acc, cur, idx) {
                    acc.push({
                        name: uniqueNames[idx],
                        count: cur
                    });
                    return acc;
                }, [])
                    .filter(function (el) { return el.count > 0; });
                return [2 /*return*/, nameCounts.sort(compareCounts)];
        }
    });
}); };
/**
 * Takes a name and returns a count of occurrences in Oliver Twist
 * @param name a name to search the text for
 */
var countName = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var needle, streamSearch, readStream;
    return __generator(this, function (_a) {
        needle = Buffer.from(name, 'utf8');
        streamSearch = new StreamSearch(needle);
        readStream = fs_1.default.createReadStream(path_1.default.join(__dirname, '../inputs/oliver-twist.txt'), 'utf8');
        return [2 /*return*/, new Promise(function (resolve) {
                readStream.on('data', function (chunk) {
                    streamSearch.push(chunk);
                }).on('end', function () {
                    resolve(streamSearch.matches);
                });
            })];
    });
}); };
/**
 * Creates or overwrites a results file
 * @param nameCounts array of objects of names and counts
 */
var writeResults = function (nameCounts) { return __awaiter(void 0, void 0, void 0, function () {
    var stream;
    return __generator(this, function (_a) {
        stream = fs_1.default.createWriteStream("results.txt");
        stream.once('open', function () {
            nameCounts.map(function (el) {
                stream.write(el.name + ": " + el.count + "\n");
            });
            stream.end();
        });
        console.log("Wrote " + nameCounts.length + " lines to results.txt");
        return [2 /*return*/];
    });
}); };
/**
 * runs code, outputs results, times execution
 */
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var hrstart, nameCounts, hrend;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hrstart = process.hrtime();
                return [4 /*yield*/, processNames()];
            case 1:
                nameCounts = _a.sent();
                writeResults(nameCounts);
                hrend = process.hrtime(hrstart);
                console.info('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
                return [2 /*return*/];
        }
    });
}); };
main();
