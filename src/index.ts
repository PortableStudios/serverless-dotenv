import { args, createEnv } from './lib/app';

const options = args(process.argv);
createEnv(options);