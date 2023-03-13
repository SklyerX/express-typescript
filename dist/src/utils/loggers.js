"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectFinishedInfo = exports.showData = exports.error = exports.info = exports.success = void 0;
const chalk_1 = __importDefault(require("chalk"));
const moment_1 = __importDefault(require("moment"));
const gray = (text) => chalk_1.default.grey(text);
function success(message) {
    console.log(`[ ${chalk_1.default.yellow((0, moment_1.default)().format("LT"))} ] `, chalk_1.default.greenBright(message));
}
exports.success = success;
function info(message) {
    console.log(`[ ${chalk_1.default.yellow((0, moment_1.default)().format("LT"))} ] `, chalk_1.default.blueBright(message));
}
exports.info = info;
function error(message) {
    console.log(`[ ${chalk_1.default.yellow((0, moment_1.default)().format("LT"))} ] `, chalk_1.default.red(message));
}
exports.error = error;
function showData(fileName, httpMethod, path) {
    console.log(`${gray((0, moment_1.default)().format("LTS"))} ${chalk_1.default.green("INF")} ${gray(">")} ${gray("filename")}=${fileName} ${gray("METHOD")}=${httpMethod} ${gray("located")}=${path}`);
}
exports.showData = showData;
function projectFinishedInfo(projectName, isNpm, isGit, isDownload) {
    console.log(`${gray((0, moment_1.default)().format("LTS"))} ${chalk_1.default.green("INF")} ${gray(">")} ${gray("name")}=${projectName} ${gray("pkg-manager")}=${isNpm} ${gray("git")}=${isGit} ${gray("download")}=${isDownload}`);
}
exports.projectFinishedInfo = projectFinishedInfo;
