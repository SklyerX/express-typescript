#!/usr/bin/env node
import fs from "fs";
import terminal from "child_process";
import inquirer from "inquirer";
import parseArgs from "minimist";
import { createSpinner } from "nanospinner";
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
} from "./__mocks__/outer";
import {
  healthts,
  indexts,
  maints,
  templateFilets,
  utilsSlashLoggersts,
} from "./__mocks__/inner";
import { error, info, success } from "./utils/loggers";

const argv = parseArgs(process.argv.slice(2));

let { _, git, download, npm } = argv;

git = git ?? true;
download = download ?? false;
npm = npm === undefined || npm === "true";

/**
 * Initialize a new GitHub repository.
 *
 * @param projectName The name of the project.
 * @param downloadEnabled Whether to download node modules.
 * @param npmEnabled Whether to use NPM or Yarn.
 */

async function initializeGithubRepo(
  projectName: string,
  downloadEnabled: boolean,
  npmEnabled: boolean
) {
  const gitSpinner = createSpinner("Initializing GitHub Repo").start();

  try {
    await executeCommand(`cd ${projectName} && git init`, (output) => null);
    gitSpinner.success();

    if (!downloadEnabled) {
      info(
        `\n\n-------\ncd ${projectName}\n${
          npmEnabled ? "npm" : "yarn"
        } install\nnodemon start`
      );
    }
  } catch (error) {
    gitSpinner.error();
  }
}

/**
 * Download the node modules
 *
 * @param projectName The name of the project.
 */

async function downloadNodeModules(projectName: string) {
  if (download == "true") {
    const npmSpinner = createSpinner("Downloading node modules").start();
    executeCommand(
      `cd ${projectName} && ${npm ? "npm" : "yarn"} install`,
      () => {
        npmSpinner.success();
        info(
          `\n\n-------\ncd ${projectName}\n${
            npm ? "npm" : "yarn"
          } install\nnodemon start`
        );
      }
    );
    return 0;
  }
}

async function bootstrap() {
  let projectName = "";

  if (_.length <= 0) {
    error("Provide a name!");
    info(
      "Run like: express-typescript dirname --git true --download true --npm false"
    );
    return 1;
  }

  projectName = _[0];

  if (git) initializeGithubRepo(projectName, download, npm);

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

  for (const directory of directories) await fs.mkdirSync(directory);

  // Creating file content
  const files = [
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
    { path: `./${projectName}/src/routes/v1/main.ts`, content: maints },
    {
      path: `./${projectName}/src/routes/v1/endpoints/health.ts`,
      content: healthts,
    },
  ];

  for (const file of files) await fs.writeFileSync(file.path, file.content);

  downloadNodeModules(projectName);
}

function executeCommand(command: string, callback: (param: string) => void) {
  terminal.exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
}

async function addNewRoute() {
  const getName = await inquirer.prompt({
    name: "controller_name",
    type: "input",
    message: "What is the name of this controller? ",
    default() {
      return "route-name";
    },
  });

  const controllerName = getName.controller_name;

  fs.stat("./exts.config.json", async function (err, stat) {
    if (err == null) {
      const data = JSON.parse(fs.readFileSync("./exts.config.json", "utf-8"));
      const projectName = data.projectName;
      try {
        fs.appendFile(
          `./src/routes/v1/main.ts`,
          `router.get('/${controllerName}', require('./endpoints/${controllerName}'));`,
          function (err) {
            if (err) return error("Something went wrong!");
            success("New file endpoint generated.");
          }
        );
      } catch (err) {
        error("Something went wrong while adding the file");
      }

      try {
        await fs.writeFileSync(
          `./src/routes/v1/endpoints/${controllerName}.ts`,
          templateFilets
        );
      } catch (err) {
        error(
          "Something went wrong while creating the file in the endpoints directory!"
        );
      }
    } else if (err.code === "ENOENT") {
      error(
        "Please make sure you are a working directory generated by express-typescript"
      );
    } else {
      console.log("Some other error: ", err.code);
    }
  });
}

if (_[0] == "generate") addNewRoute();
else bootstrap();
