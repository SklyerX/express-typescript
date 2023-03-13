"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectories = exports.getFiles = void 0;
const inner_1 = require("../__mocks__/inner");
const outer_1 = require("../__mocks__/outer");
function getFiles(projectName) {
    return [
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
        { path: `./${projectName}/src/routes/main.ts`, content: inner_1.maints },
        {
            path: `./${projectName}/src/routes/endpoints/health.ts`,
            content: inner_1.healthts,
        },
    ];
}
exports.getFiles = getFiles;
function getDirectories(projectName) {
    return [
        `${projectName}`,
        `${projectName}/src`,
        `${projectName}/src/interfaces`,
        `${projectName}/src/routes`,
        `${projectName}/src/routes/endpoints`,
        `${projectName}/src/schemas`,
        `${projectName}/src/utils`,
    ];
}
exports.getDirectories = getDirectories;
