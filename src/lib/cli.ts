import Listr from 'listr';
import yargs from 'yargs';

import { fetchExports, replaceExportNamesWithValues } from './aws';
import { findFile, parseEnvMappings, writeFile } from './envMap';

export interface Options {
  readonly stage: string;
  readonly profile: string;
  readonly region: string;
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
    .option('region', {
      demandOption: true,
      describe: 'The AWS region that you are deploying to.',
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

export function createEnv(options: Options): Promise<any> {
  const tasks = new Listr([
    {
      task: () => {
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
      title: 'Parsing ENV to CloudFormation mappings'
    },
    {
      task: async ctx => {
        const exports = await fetchExports(options);
        // tslint:disable-next-line
        ctx.exports = exports;
      },
      title: 'Fetch exports from CloudFormation'
    },
    {
      task: ctx => {
        const cloudFormationMappings = replaceExportNamesWithValues(
          ctx.mappings,
          ctx.exports
        );
        switch (cloudFormationMappings._tag) {
          case 'Left':
            return Promise.reject(cloudFormationMappings.left);
          case 'Right':
            return Promise.resolve(
              // tslint:disable-next-line
              (ctx.cloudFormationMappings = cloudFormationMappings.right)
            );
        }
      },
      title: 'Replace mapping values with CloudFormation values'
    },
    {
      task: ctx => writeFile(ctx.cloudFormationMappings, options),
      title: 'Writing .env file for stage'
    }
  ]);

  return tasks.run();
}
