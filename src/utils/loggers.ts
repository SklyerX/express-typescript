import chalk from "chalk";

export function success(message: any) {
  console.log(chalk.greenBright(message));
}

export function error(message: any) {
  console.log(chalk.red(message));
}
