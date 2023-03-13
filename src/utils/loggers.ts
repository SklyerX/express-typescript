import chalk from "chalk";
import moment from "moment";

const gray = (text: string) => chalk.grey(text);

export function success(message: any) {
  console.log(
    `[ ${chalk.yellow(moment().format("LT"))} ] `,
    chalk.greenBright(message)
  );
}

export function info(message: any) {
  console.log(
    `[ ${chalk.yellow(moment().format("LT"))} ] `,
    chalk.blueBright(message)
  );
}

export function infoNoDate(message: any) {
  console.log(chalk.blueBright(message));
}

export function error(message: any) {
  console.log(
    `[ ${chalk.yellow(moment().format("LT"))} ] `,
    chalk.red(message)
  );
}

export function showData(fileName: string, httpMethod: string, path: string) {
  console.log(
    `${gray(moment().format("LTS"))} ${chalk.green("INF")} ${gray(">")} ${gray(
      "filename"
    )}=${fileName} ${gray("METHOD")}=${httpMethod} ${gray("located")}=${path}`
  );
}

export function projectFinishedInfo(
  projectName: string,
  isNpm: boolean,
  isGit: boolean,
  isDownload: Blob
) {
  console.log(
    `${gray(moment().format("LTS"))} ${chalk.green("INF")} ${gray(">")} ${gray(
      "name"
    )}=${projectName} ${gray("npm")}=${isNpm} ${gray("git")}=${isGit} ${gray(
      "download"
    )}=${isDownload}`
  );
}
