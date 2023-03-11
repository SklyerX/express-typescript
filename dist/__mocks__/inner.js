"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateFilets = exports.healthts = exports.maints = exports.utilsSlashLoggersts = exports.indexts = void 0;
exports.indexts = `import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import glob from 'glob';
import { promisify } from 'util';

import { alert, error, success, warn } from './utils/loggers';

const globPromise = promisify(glob);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/v1', require('./routes/v1/main'));

const PORT = process.env.PORT ? process.env.PORT : 3001;
const MONGODB_URI = process.env.MONGODB_URI

app.listen(PORT, () =>
  success("Listening to requests at: http://127.0.0.1:" + PORT, "Notification"),
);

mongoose.connect(\`\${MONGODB_URI}\`, { retryWrites: true, w: 'majority' });
mongoose.connection
  .on('connected', () => {
    warn("To MongoDB", 'Db Connected');
  })
  .on('error', (err) => {
    error(err, 'DB Error');
  })
  .on('disconnected', () => {
    error("From MongoDB", 'Db Disconnected');
  })
  .on('reconnected', () => {
    warn("To MongoDB", 'DB reconnected');
  })
  .on('timeout', () => {
    error("MongoDB Connection", 'Db Timeout');
  })
  .on('close', () => {
    warn("MongoDB Connection", "Db closed");
  });

  // LOADED ENDPOINTS

(async () => {
    const endpoints = await globPromise(\`\${process.cwd()}/src/routes/v1/**/*.ts\`);
    endpoints.map((value) => {
      const fileName = value.split('/endpoints/')[1];
      if (fileName === undefined) return;
      alert("Success! Loaded:" + fileName, 'Routes');
    });
})();`;
exports.utilsSlashLoggersts = `import chalk from 'chalk';

export function success(message: string, route: string) {
  const yellow = chalk.yellowBright(\`\${route.toUpperCase()}\`)
  console.log(chalk.green("[ " + \`\${yellow}\` + " ]" + \`\${message}\`))
}

export function alert(message: string, route: string) {
  const cyan = chalk.cyan(\`\${route.toUpperCase()}\`)
  console.log(chalk.green("[ " + \`\${cyan}\` + " ]" + \`\${message}\`))
}

export function error(message: string, route: string) {
  const white = chalk.white(\`\${route.toUpperCase()}\`)
  console.log(chalk.red("[ " + \`\${white}\` + " ]" + \`\${message}\`))
}

export function warn(message: string, route: string) {
  const magenta = chalk.magenta(\`\${route.toUpperCase()}\`)
  console.log(chalk.red("[ " + \`\${magenta}\` + " ]" + \`\${message}\`))
}
`;
exports.maints = `import express from 'express';
import chalk from 'chalk';
import { alert } from '../../utils/loggers';

const router = express.Router();

module.exports = router;

router.use((req, res, next) => {
  alert(\`\${req.originalUrl} \${chalk.yellowBright('-')} \${req.method} \${chalk.yellowBright(
      '-',
    )} \${new Date().toISOString()}\`,
    'Request Info',
  );
  next();
});

router.get('/health', require('./endpoints/health'));`;
exports.healthts = `import { Request, Response } from "express";

module.exports = (req: Request, res: Response) => {
  return res.status(200).send({
    success: true,
    message: 'The api is active and healthy.',
  });
};`;
exports.templateFilets = `import { Request, Response } from "express";

module.exports = (req: Request, res: Response) => {
  res.status(302).send({
    message: "Endpoint is live"
  });
  
  return 0;
};`;
