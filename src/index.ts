#!/usr/bin/env node
import { createSpinner } from "nanospinner";
import fs from "fs";
import { error } from "./utils/loggers";
import {
  dotenv,
  editorconfig,
  eslint,
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
  utilsSlashLoggersts,
} from "./__mocks__/inner";

async function bootstrap() {
  let projectName = "";

  if (!process.argv[2] && process.argv[2] !== "--name") {
    error("you are missing the --name value!");
    process.exit();
  }
  if (!process.argv[3]) {
    error("Name value is missing!");
    process.exit();
  }
  projectName = process.argv[3];

  const spinner = createSpinner().start({
    text: "Creating project files...",
    color: "cyan",
  });

  // Create data
  await fs.mkdirSync(`${projectName}`);
  await fs.mkdirSync(`${projectName}/src`);
  await fs.mkdirSync(`${projectName}/src/interfaces`);
  await fs.mkdirSync(`${projectName}/src/routes`);
  await fs.mkdirSync(`${projectName}/src/routes/v1`);
  await fs.mkdirSync(`${projectName}/src/routes/v1/endpoints`);
  await fs.mkdirSync(`${projectName}/src/schemas`);
  await fs.mkdirSync(`${projectName}/src/utils`);
  // Create outer files
  await fs.writeFileSync(`./${projectName}/tsconfig.json`, tsconfig);
  await fs.writeFileSync(`./${projectName}/package.json`, packagejson);
  await fs.writeFileSync(`./${projectName}/nodemon.json`, nodemonjson);
  await fs.writeFileSync(`./${projectName}/.prettierrc`, prettier[0]);
  await fs.writeFileSync(`./${projectName}/.prettierignore`, prettier[1]);
  await fs.writeFileSync(`./${projectName}/.gitignore`, gitignore);
  await fs.writeFileSync(`./${projectName}/.eslintrc.json`, eslint[0]);
  await fs.writeFileSync(`./${projectName}/.eslintignore`, eslint[1]);
  await fs.writeFileSync(`./${projectName}/.env`, dotenv);
  await fs.writeFileSync(`./${projectName}/.editorconfig`, editorconfig);
  //   Create Inner files
  await fs.writeFileSync(`./${projectName}/src/index.ts`, indexts);
  await fs.writeFileSync(
    `./${projectName}/src/utils/loggers.ts`,
    utilsSlashLoggersts
  );
  await fs.writeFileSync(`./${projectName}/src/routes/v1/main.ts`, maints);
  await fs.writeFileSync(
    `./${projectName}/src/routes/v1/endpoints/health.ts`,
    healthts
  );

  spinner.success({ text: "Sucess! Project files created." });

  console.log(`cd ${projectName}\nnpm install\nnodemon start`);
}

bootstrap();
