#!/usr/bin/env node
import fs from "fs";
import terminal from "child_process";
import inquirer from "inquirer";
import minimist from "minimist";
import { createSpinner } from "nanospinner";
import {
  info,
  success,
  error,
  showData,
  projectFinishedInfo,
  infoNoDate,
} from "./utils/loggers";
import { getDirectories, getFiles } from "./utils/ContentDeliverer";
import { templateFilets } from "./__mocks__/inner";

/**
 * Grabbing the arguments the user passes while running the cli.
 * EX: exts generate /careers/main <-- it's starts from the "main.ts" file | the main.ts file is the "root"
 * or
 * exts new projectName --git boolean --download boolean --npm boolean
 */

const argv = minimist(process.argv.splice(2));
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
      projectFinishedInfo(projectName, npm, git, download);
      infoNoDate(
        `\ncd ${projectName}\n${
          npmEnabled ? "npm" : "yarn"
        } install\nnodemon start`
      );
    }
  } catch (error) {
    gitSpinner.error();
  }
}

/**
 * Executing a command in the terminal.
 *
 * @param command The string of command(s) to execute in the terminal.
 * @param output The output to the terminal of the command ran. (Ex: node modules downloaded).
 */

function executeCommand(command: string, callback: (output: string) => void) {
  terminal.exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
}

/**
 * Download the node_modules
 *
 * @param projectName The name of the project you will be operating in.
 */

async function downloadNodeModules(projectName: string) {
  if (download == "true") {
    const npmSpinner = createSpinner("Downloading node_modules").start();
    executeCommand(
      `cd ${projectName} && ${npm ? "npm" : "yarn"} install`,
      () => {
        npmSpinner.success();
        projectFinishedInfo(projectName, npm, git, download);
        infoNoDate(
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
  // Variables and Data
  let projectName = "";

  if (_.length <= 0) {
    error("You have to provide a directory name in order to run the command!");
    info(
      "Example: exts new DirectoryName --git Boolean --download Boolean --npm Boolean"
    );

    return 0;
  }

  projectName = _[1];

  if (git) initializeGithubRepo(projectName, download, npm);

  let directories = getDirectories(projectName);
  let files = getFiles(projectName);

  for (const dir of directories) await fs.mkdirSync(dir);
  for (const file of files) await fs.writeFileSync(file.path, file.content);

  downloadNodeModules(projectName);
}

/**
 * Sanitize the file name. This function will remove any
 * invalid characters that can not be placed in a filename
 *
 * @param fileName The file name that you will use for the file.
 */

function sanitizeFileName(fileName: string) {
  const invalidChars = /[/:*?"<>|\\]/g;
  if (invalidChars.test(fileName)) {
    return fileName.replace(invalidChars, "-");
  }
  return fileName;
}

async function addNewRoute() {
  const filePath = _[1];
  const specificFile = filePath !== undefined ? true : false;

  const getName = await inquirer.prompt({
    name: "controller_name",
    type: "input",
    message: "What is the name of the file? ",
    default() {
      return "file-name";
    },
  });

  const getRoute = await inquirer.prompt({
    name: "route_name",
    type: "input",
    message: "What is the route endpoint? ",
    default() {
      return "route-name";
    },
  });

  const httpMethod = await inquirer.prompt({
    name: "http_method",
    type: "list",
    choices: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "HEAD",
      "CONNECT",
      "OPTIONS",
      "TRACE",
    ],
    message: "What is the http method? ",
    default() {
      return "get";
    },
  });

  const fileName = sanitizeFileName(getName.controller_name);
  const routeName = getRoute.route_name;
  const http_method = httpMethod.http_method;

  fs.stat("./exts.config.json", async function (err, stat) {
    if (err == null) {
      fs.appendFile(
        "./src/routes/main.ts",
        `\nrouter.${http_method.toLowerCase()}("/${routeName}", require("${
          specificFile
            ? `./${filePath}/${fileName}.ts`
            : `./endpoints/${fileName}.ts`
        }"));`,
        function (err) {
          if (err)
            error(
              "Something went wrong while appending new data to 'main.ts'!"
            );
        }
      );

      if (specificFile) {
        const dirs = [...filePath.split("/")];
        let currentPath = "./src/routes";

        for (const dir of dirs) {
          currentPath = `${currentPath}/${dir}`;

          if (!fs.existsSync(currentPath)) {
            try {
              fs.mkdirSync(currentPath);
            } catch (err) {
              error(`Failed to create directory ${currentPath}: ${err}`);
              break;
            }
          }
        }

        await fs.writeFile(
          `${currentPath}/${fileName}.ts`,
          templateFilets,
          function (err) {
            if (err)
              return error(
                "Something went wrong while generating the file! -with"
              );
            success(`File created at: ${currentPath}/${fileName}.ts`);
            showData(fileName, http_method.toUpperCase(), currentPath);
          }
        );
      } else {
        await fs.writeFile(
          `./src/routes/endpoints/${fileName}.ts`,
          templateFilets,
          function (err) {
            if (err)
              return error(
                "Something went wrong while generating the file! -without"
              );
            success(`File created at: ./src/routes/endpoints/${fileName}.ts`);
            showData(
              fileName,
              http_method,
              `./src/routes/endpoints/${fileName}.ts`
            );
          }
        );
      }
    } else {
      error("Something went wrong!");
    }
  });
}

function showUnkown() {
  console.log(`
Unkown command: "${_[0]}"

If you don't know the commands and or their functionalities
run: "exts help"`);
}

function showHelp() {
  console.log(`
<> = required | [] = optional

exts <command>

Usage:

exts new <foo> --git boolean --download boolean --npm boolean   |  Create a new project. <foo> is the name of your project, --git can be true/false whether you want to init a github repo or not, --download allows you to download the modules with the package manager of your choice (npm/yarn), --npm allows you to select your package manager between npm and yarn.

exts generate [foo]  | create a new route for the api. The [foo] value is the location you'd like to create the file in from the root (the root is main.ts).

for more help visit the README.md in https://github.com/SklyerX/express-typescript
`);
}

if (_[0] == "new") bootstrap();
else if (_[0] == "generate") addNewRoute();
else if (_[0] == "help") showHelp();
else showUnkown();
