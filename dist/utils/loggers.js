"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
const chalk_1 = __importDefault(require("chalk"));
function success(message) {
    console.log(chalk_1.default.greenBright(message));
}
exports.success = success;
function error(message) {
    console.log(chalk_1.default.red(message));
}
exports.error = error;
