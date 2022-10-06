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
const nanospinner_1 = require("nanospinner");
const fs_1 = __importDefault(require("fs"));
const loggers_1 = require("./utils/loggers");
const outer_1 = require("./__mocks__/outer");
const inner_1 = require("./__mocks__/inner");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        let projectName = "";
        const spinner = (0, nanospinner_1.createSpinner)().start({
            text: "Creating project files...",
            color: "cyan",
        });
        if (!process.argv[2] && process.argv[2] !== "--name")
            return (0, loggers_1.error)("you are missing the --name value!");
        if (!process.argv[3])
            return (0, loggers_1.error)("Name value is missing!");
        projectName = process.argv[3];
        // Create data
        yield fs_1.default.mkdirSync(`${projectName}`);
        yield fs_1.default.mkdirSync(`${projectName}/src`);
        yield fs_1.default.mkdirSync(`${projectName}/src/interfaces`);
        yield fs_1.default.mkdirSync(`${projectName}/src/routes`);
        yield fs_1.default.mkdirSync(`${projectName}/src/routes/v1`);
        yield fs_1.default.mkdirSync(`${projectName}/src/routes/v1/endpoints`);
        yield fs_1.default.mkdirSync(`${projectName}/src/schemas`);
        yield fs_1.default.mkdirSync(`${projectName}/src/utils`);
        // Create outer files
        yield fs_1.default.writeFileSync(`./${projectName}/tsconfig.json`, outer_1.tsconfig);
        yield fs_1.default.writeFileSync(`./${projectName}/package.json`, outer_1.packagejson);
        yield fs_1.default.writeFileSync(`./${projectName}/nodemon.json`, outer_1.nodemonjson);
        yield fs_1.default.writeFileSync(`./${projectName}/.prettierrc`, outer_1.prettier[0]);
        yield fs_1.default.writeFileSync(`./${projectName}/.prettierignore`, outer_1.prettier[1]);
        yield fs_1.default.writeFileSync(`./${projectName}/.gitignore`, outer_1.gitignore);
        yield fs_1.default.writeFileSync(`./${projectName}/.eslintrc.json`, outer_1.eslint[0]);
        yield fs_1.default.writeFileSync(`./${projectName}/.eslintignore`, outer_1.eslint[1]);
        yield fs_1.default.writeFileSync(`./${projectName}/.env`, outer_1.dotenv);
        yield fs_1.default.writeFileSync(`./${projectName}/.editorconfig`, outer_1.editorconfig);
        //   Create Inner files
        yield fs_1.default.writeFileSync(`./${projectName}/src/index.ts`, inner_1.indexts);
        yield fs_1.default.writeFileSync(`./${projectName}/src/utils/loggers.ts`, inner_1.utilsSlashLoggersts);
        yield fs_1.default.writeFileSync(`./${projectName}/src/routes/v1/main.ts`, inner_1.maints);
        yield fs_1.default.writeFileSync(`./${projectName}/src/routes/v1/endpoints/health.ts`, inner_1.healthts);
        spinner.success({ text: "Sucess! Project files created." });
        console.log(`cd ${projectName}\nnpm install\nnodemon start`);
    });
}
bootstrap();
