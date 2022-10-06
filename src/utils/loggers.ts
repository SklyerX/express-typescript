import chalk from "chalk";

export function success(message: any) {
  console.log(chalk.greenBright(message));
}

export function error(message: any) {
  console.log(chalk.red(message));
}

export function alert(message: any) {
  console.log(chalk.cyan(message));
}

export function warn(message: any) {
  console.log(chalk.yellowBright(message));
}
