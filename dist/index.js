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
const outer_1 = require("./__mocks__/outer");
const inner_1 = require("./__mocks__/inner");
const loggers_1 = require("./utils/loggers");
const argv = (0, minimist_1.default)(process.argv.slice(2));
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
                (0, loggers_1.info)(`\n\n-------\ncd ${projectName}\n${npmEnabled ? "npm" : "yarn"} install\nnodemon start`);
            }
        }
        catch (error) {
            gitSpinner.error();
        }
    });
}
/**
 * Download the node modules
 *
 * @param projectName The name of the project.
 */
function downloadNodeModules(projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (download == "true") {
            const npmSpinner = (0, nanospinner_1.createSpinner)("Downloading node modules").start();
            executeCommand(`cd ${projectName} && ${npm ? "npm" : "yarn"} install`, () => {
                npmSpinner.success();
                (0, loggers_1.info)(`\n\n-------\ncd ${projectName}\n${npm ? "npm" : "yarn"} install\nnodemon start`);
            });
            return 0;
        }
    });
}
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        let projectName = "";
        if (_.length <= 0) {
            (0, loggers_1.error)("Provide a name!");
            (0, loggers_1.info)("Run like: express-typescript dirname --git boolean");
            return 1;
        }
        projectName = _[0];
        if (git)
            initializeGithubRepo(projectName, download, npm);
        // Creating directories
        const directories = [
            `${projectName}`,
            `${projectName}/src`,
            `${projectName}/src/interfaces`,
            `${projectName}/src/routes`,
            `${projectName}/src/routes/v1`,
            `${projectName}/src/routes/v1/endpoints`,
            `${projectName}/src/schemas`,
            `${projectName}/src/utils`,
        ];
        for (const directory of directories)
            yield fs_1.default.mkdirSync(directory);
        // Creating file content
        const files = [
            {
                path: `./${projectName}/exts.config.json`,
                content: (0, outer_1.extsconfigjson)(projectName),
            },
            { path: `./${projectName}/tsconfig.json`, content: outer_1.tsconfig },
            { path: `./${projectName}/package.json`, content: outer_1.packagejson },
            { path: `./${projectName}/nodemon.json`, content: outer_1.nodemonjson },
            { path: `./${projectName}/.prettierrc`, content: outer_1.prettier[0] },
            { path: `./${projectName}/.prettierignore`, content: outer_1.prettier[1] },
            { path: `./${projectName}/.gitignore`, content: outer_1.gitignore },
            { path: `./${projectName}/.eslintrc.json`, content: outer_1.eslint[0] },
            { path: `./${projectName}/.eslintignore`, content: outer_1.eslint[1] },
            { path: `./${projectName}/.env`, content: outer_1.dotenv },
            { path: `./${projectName}/.editorconfig`, content: outer_1.editorconfig },
            { path: `./${projectName}/src/index.ts`, content: inner_1.indexts },
            {
                path: `./${projectName}/src/utils/loggers.ts`,
                content: inner_1.utilsSlashLoggersts,
            },
            { path: `./${projectName}/src/routes/v1/main.ts`, content: inner_1.maints },
            {
                path: `./${projectName}/src/routes/v1/endpoints/health.ts`,
                content: inner_1.healthts,
            },
        ];
        for (const file of files)
            yield fs_1.default.writeFileSync(file.path, file.content);
        downloadNodeModules(projectName);
    });
}
function executeCommand(command, callback) {
    child_process_1.default.exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
}
function addNewRoute() {
    return __awaiter(this, void 0, void 0, function* () {
        const getName = yield inquirer_1.default.prompt({
            name: "controller_name",
            type: "input",
            message: "What is the name of this controller? ",
            default() {
                return "route-name";
            },
        });
        const controllerName = getName.controller_name;
        fs_1.default.stat("./exts.config.json", function (err, stat) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err == null) {
                    const data = JSON.parse(fs_1.default.readFileSync("./exts.config.json", "utf-8"));
                    const projectName = data.projectName;
                    yield fs_1.default.writeFileSync(`./${projectName}/src/routes/v1/endpoints/${controllerName}.ts`, inner_1.healthts);
                    fs_1.default.appendFile(`./${projectName}/src/routes/v1/main.ts`, `router.get('/${controllerName}', require('./endpoints/${controllerName}'));`, function (err) {
                        if (err)
                            return (0, loggers_1.error)("Something went wrong!");
                        (0, loggers_1.success)("New file endpoint generated.");
                    });
                }
                else if (err.code === "ENOENT") {
                    (0, loggers_1.error)("Please make sure you are a working directory generated by express-typescript");
                }
                else {
                    console.log("Some other error: ", err.code);
                }
            });
        });
    });
}
if (_[0] == "generate")
    addNewRoute();
else
    bootstrap();
