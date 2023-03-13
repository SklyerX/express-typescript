import {
  healthts,
  indexts,
  maints,
  utilsSlashLoggersts,
} from "../__mocks__/inner";
import {
  dotenv,
  editorconfig,
  eslint,
  extsconfigjson,
  gitignore,
  nodemonjson,
  packagejson,
  prettier,
  tsconfig,
} from "../__mocks__/outer";

export function getFiles(projectName: string) {
  return [
    {
      path: `./${projectName}/exts.config.json`,
      content: extsconfigjson(projectName),
    },
    { path: `./${projectName}/tsconfig.json`, content: tsconfig },
    { path: `./${projectName}/package.json`, content: packagejson },
    { path: `./${projectName}/nodemon.json`, content: nodemonjson },
    { path: `./${projectName}/.prettierrc`, content: prettier[0] },
    { path: `./${projectName}/.prettierignore`, content: prettier[1] },
    { path: `./${projectName}/.gitignore`, content: gitignore },
    { path: `./${projectName}/.eslintrc.json`, content: eslint[0] },
    { path: `./${projectName}/.eslintignore`, content: eslint[1] },
    { path: `./${projectName}/.env`, content: dotenv },
    { path: `./${projectName}/.editorconfig`, content: editorconfig },
    { path: `./${projectName}/src/index.ts`, content: indexts },
    {
      path: `./${projectName}/src/utils/loggers.ts`,
      content: utilsSlashLoggersts,
    },
    { path: `./${projectName}/src/routes/main.ts`, content: maints },
    {
      path: `./${projectName}/src/routes/endpoints/health.ts`,
      content: healthts,
    },
  ];
}

export function getDirectories(projectName: string) {
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
