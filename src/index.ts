import { args, createEnv } from './lib/cli';

const options = args(process.argv);
createEnv(options);