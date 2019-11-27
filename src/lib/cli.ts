import yargs from 'yargs';
import Listr from 'listr';

import { parseEnvMappings, findFile } from './envMap';
import { fetchExports } from './aws';

export interface Options {
  stage: string,
  profile: string,
  envMapFile: string,
}

export function args(args: string[]): Options {
  const options = yargs
    .option('stage', {
      demandOption: true,
      type: 'string',
      requiresArg: true,
      describe: 'The stage you have provided for your serverless deploy.'
    })
    .option('profile', {
      demandOption: true,
      type: 'string',
      requiresArg: true,
      describe: 'Your AWS profile as stored in your AWS credentials.'
    })
    .option('envMapFile', {
      type: 'string',
      default: 'envMap.yml',
      requiresArg: true,
      describe: 'This file should contain the mapping for ENV variables to CloudFormation exports that you wish to use.'
    })
    .version()
    .help()
    .parse(args);

  return options;
}

export async function createEnv(options: Options) {
  const tasks = new Listr([
    {
      title: 'Searching for envMap.yml',
      task: (_ctx) => {
        findFile(options)
      }
    },
    {
      title: 'Parsing ENV to Cloudformation mappings',
      task: (ctx) => {
        const mappings = parseEnvMappings(options)
        ctx.mappings = mappings
      }
    },
    {
      title: 'Fetch exports from Cloudfront',
      task: async (ctx) => {
        const results = await fetchExports(ctx.mappings, options)
        ctx.mappings = results
      }
    },
    // {
    //   title: 'Writing .env file for stage',
    //   task: (ctx) => writeFile(ctx.mappings, options)
    // }
  ]);

  try {
    await tasks.run()
  } finally {
    process.exit(1)
  }
}