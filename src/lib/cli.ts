import Listr from 'listr';
import yargs from 'yargs';

import { fetchExports } from './aws';
import { findFile, parseEnvMappings } from './envMap';

export interface Options {
  readonly stage: string;
  readonly profile: string;
  readonly envMapFile: string;
}

export function args(cliArgs: readonly string[]): Options {
  const options = yargs
    .option('stage', {
      demandOption: true,
      describe: 'The stage you have provided for your serverless deploy.',
      requiresArg: true,
      type: 'string'
    })
    .option('profile', {
      demandOption: true,
      describe: 'Your AWS profile as stored in your AWS credentials.',
      requiresArg: true,
      type: 'string'
    })
    .option('envMapFile', {
      default: 'envMap.yml',
      describe:
        'This file should contain the mapping for ENV variables to CloudFormation exports that you wish to use.',
      requiresArg: true,
      type: 'string'
    })
    .version()
    .help()
    .parse(cliArgs);

  return options;
}

export async function createEnv(options: Options): Promise<any> {
  const tasks = new Listr([
    {
      // tslint:disable-next-line
      task: _ctx => {
        return findFile(options);
      },
      title: 'Searching for envMap.yml'
    },
    {
      task: ctx => {
        const mappings = parseEnvMappings(options);
        // tslint:disable-next-line
        ctx.mappings = mappings;
      },
      title: 'Parsing ENV to Cloudformation mappings'
    },
    {
      task: async ctx => {
        const results = await fetchExports(ctx.mappings, options);
        // tslint:disable-next-line
        ctx.mappings = results;
      },
      title: 'Fetch exports from Cloudfront'
    }
    // {
    //   title: 'Writing .env file for stage',
    //   task: (ctx) => writeFile(ctx.mappings, options)
    // }
  ]);

  try {
    return await tasks.run();
  } finally {
    process.exit(1);
  }
}
