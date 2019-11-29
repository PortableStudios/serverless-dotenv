import { args, createEnv } from './lib/cli';

const options = args(process.argv);
// tslint:disable-next-line:no-expression-statement
createEnv(options);
