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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const child_process_1 = __importDefault(require("child_process"));
const inquirer_1 = __importDefault(require("inquirer"));
const minimist_1 = __importDefault(require("minimist"));
const nanospinner_1 = require("nanospinner");
const loggers_1 = require("./utils/loggers");
const ContentDeliverer_1 = require("./utils/ContentDeliverer");
const inner_1 = require("./__mocks__/inner");
/**
 * Grabbing the arguments the user passes while running the cli.
 * EX: exts generate /careers/main <-- it's starts from the "main.ts" file | the main.ts file is the "root"
 * or
 * exts new projectName --git boolean --download boolean --npm boolean
 */
const argv = (0, minimist_1.default)(process.argv.splice(2));
let { _, git, download, npm } = argv;
git = git !== null && git !== void 0 ? git : true;
download = download !== null && download !== void 0 ? download : false;
npm = npm === undefined || npm === "true";
/**
 * Initialize a new GitHub repository.
 *
 * @param projectName The name of the project.
 * @param downloadEnabled Whether to download node modules.
 * @param npmEnabled Whether to use NPM or Yarn.
 */
function initializeGithubRepo(projectName, downloadEnabled, npmEnabled) {
    return __awaiter(this, void 0, void 0, function* () {
        const gitSpinner = (0, nanospinner_1.createSpinner)("Initializing GitHub Repo").start();
        try {
            yield executeCommand(`cd ${projectName} && git init`, (output) => null);
            gitSpinner.success();
            if (!downloadEnabled) {
                (0, loggers_1.projectFinishedInfo)(projectName, npm, git, download);
                (0, loggers_1.info)(`cd ${projectName}\n${npmEnabled ? "npm" : "yarn"} install\nnodemon start`);
            }
        }
        catch (error) {
            gitSpinner.error();
        }
    });
}
/**
 * Executing a command in the terminal.
 *
 * @param command The string of command(s) to execute in the terminal.
 * @param output The output to the terminal of the command ran. (Ex: node modules downloaded).
 */
function executeCommand(command, callback) {
    child_process_1.default.exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
}
/**
 * Download the node modules
 *
 * @param projectName The name of the project you will be operating in.
 */
function downloadNodeModules(projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (download == "true") {
            const npmSpinner = (0, nanospinner_1.createSpinner)("Downloading node modules").start();
            executeCommand(`cd ${projectName} && ${npm ? "npm" : "yarn"} install`, () => {
                npmSpinner.success();
                (0, loggers_1.info)(`\n\n-------\ncd ${projectName}\n${npm ? "npm" : "yarn"} install\nnodemon start`);
            });
            (0, loggers_1.projectFinishedInfo)(projectName, npm, git, download);
            return 0;
        }
    });
}
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        // Variables and Data
        let projectName = "";
        if (_.length <= 0) {
            (0, loggers_1.error)("You have to provide a directory name in order to run the command!");
            (0, loggers_1.info)("Example: exts new DirectoryName --git Boolean --download Boolean --npm Boolean");
            return 0;
        }
        projectName = _[1];
        if (git)
            initializeGithubRepo(projectName, download, npm);
        let directories = (0, ContentDeliverer_1.getDirectories)(projectName);
        let files = (0, ContentDeliverer_1.getFiles)(projectName);
        for (const dir of directories)
            yield fs_1.default.mkdirSync(dir);
        for (const file of files)
            yield fs_1.default.writeFileSync(file.path, file.content);
        downloadNodeModules(projectName);
    });
}
/**
 * Sanitize the file name. This function will remove any
 * invalid characters that can not be placed in a filename
 *
 * @param fileName The file name that you will use for the file.
 */
function sanitizeFileName(fileName) {
    const invalidChars = /[/:*?"<>|\\]/g;
    if (invalidChars.test(fileName)) {
        return fileName.replace(invalidChars, "-");
    }
    return fileName;
}
function addNewRoute() {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = _[1];
        const specificFile = filePath !== undefined ? true : false;
        const getName = yield inquirer_1.default.prompt({
            name: "controller_name",
            type: "input",
            message: "What is the name of the file? ",
            default() {
                return "file-name";
            },
        });
        const getRoute = yield inquirer_1.default.prompt({
            name: "route_name",
            type: "input",
            message: "What is the route endpoint? ",
            default() {
                return "route-name";
            },
        });
        const httpMethod = yield inquirer_1.default.prompt({
            name: "http_method",
            type: "input",
            message: "What is the http method? ",
            default() {
                return "get";
            },
        });
        const fileName = sanitizeFileName(getName.controller_name);
        const routeName = getRoute.route_name;
        const http_method = httpMethod.http_method;
        fs_1.default.stat("./exts.config.json", function (err, stat) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err == null) {
                    fs_1.default.appendFile("./src/routes/main.ts", `\nrouter.${http_method.toLowerCase()}("/${routeName}", require("${specificFile
                        ? `./${filePath}/${fileName}.ts`
                        : `./endpoints/${fileName}.ts`}"));`, function (err) {
                        if (err)
                            (0, loggers_1.error)("Something went wrong while appending new data to 'main.ts'!");
                    });
                    if (specificFile) {
                        const dirs = [...filePath.split("/")];
                        let currentPath = "./src/routes";
                        for (const dir of dirs) {
                            currentPath = `${currentPath}/${dir}`;
                            if (!fs_1.default.existsSync(currentPath)) {
                                try {
                                    fs_1.default.mkdirSync(currentPath);
                                }
                                catch (err) {
                                    (0, loggers_1.error)(`Failed to create directory ${currentPath}: ${err}`);
                                    break;
                                }
                            }
                        }
                        yield fs_1.default.writeFile(`${currentPath}/${fileName}.ts`, inner_1.templateFilets, function (err) {
                            if (err)
                                return (0, loggers_1.error)("Something went wrong while generating the file! -with");
                            (0, loggers_1.success)(`File created at: ${currentPath}/${fileName}.ts`);
                            (0, loggers_1.showData)(fileName, http_method.toUpperCase(), currentPath);
                        });
                    }
                    else {
                        yield fs_1.default.writeFile(`./src/routes/endpoints/${fileName}.ts`, inner_1.templateFilets, function (err) {
                            if (err)
                                return (0, loggers_1.error)("Something went wrong while generating the file! -without");
                            (0, loggers_1.success)(`File created at: ./src/routes/endpoints/${fileName}.ts`);
                            (0, loggers_1.showData)(fileName, http_method, `./src/routes/endpoints/${fileName}.ts`);
                        });
                    }
                }
                else {
                    (0, loggers_1.error)("Something went wrong!");
                }
            });
        });
    });
}
if (_[0] == "new")
    bootstrap();
else if (_[0] == "generate")
    addNewRoute();
