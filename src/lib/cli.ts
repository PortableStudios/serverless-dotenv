import yargs from 'yargs';
import Listr from 'listr';
import YAML from 'yaml';
import fs from 'fs';

import { Dictionary, interpolateValue } from './dictionary';

interface Options {
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

async function fetchExports(options: Options) {
  const { profile, stage } = options;
  console.log(profile, stage);
}

function parseFile(filePath: string): Dictionary {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return YAML.parse(fileContents);
}

async function parseEnvMappings(options: Options) {
  const { envMapFile, stage } = options;

  const yaml = parseFile(envMapFile);
  const processedYaml = interpolateValue(yaml, 'stage', stage);
  console.log(processedYaml);
}

function findEnvMapFile(options: Options) {
  const { envMapFile } = options;

  if (!fs.existsSync(envMapFile)) {
    throw new Error(`Cannot find ${envMapFile}. Please use option --envMapFile to provide the correct YAML file.`)
  }
  return true;
}

export async function createEnv(options: Options) {
  const tasks = new Listr([
    {
      title: 'Searching for envMap.yml',
      task: () => findEnvMapFile(options)
    },
    {
      title: 'Parsing ENV to Cloudformation mappings',
      task: () => parseEnvMappings(options)
    },
    {
      title: 'Fetch exports from Cloudfront',
      task: () => fetchExports(options),
    },
    {
      title: 'Writing .env file for stage',
      task: () => {}
    }
  ]);

  try {
    await tasks.run();
  } catch (error) {
    process.exit(1);
  }
}