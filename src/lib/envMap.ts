import fs from 'fs';
import YAML from 'yaml';

import { Options } from './cli';
import { Dictionary, interpolateValue } from './dictionary';

export function findFile(options: Options): Promise<boolean> {
  const { envMapFile } = options;

  return fs.existsSync(envMapFile) ? Promise.resolve(true) : Promise.reject(new Error(
    `Cannot find ${envMapFile}. Please use option --envMapFile to provide the correct YAML file.`
  ))
}

export function writeFile(mappings: Dictionary, options: Options): void {
  const { stage } = options;
  const envFile = `.env.${stage}`;

  const data = Object
    .entries(mappings)
    .map(value => `${value[0]}=${value[1]}`)
    .join("\n");

  return fs.writeFileSync(envFile, data);
}

export function parseEnvMappings(options: Options): Dictionary {
  const { envMapFile, stage } = options;

  const yaml = parseFile(envMapFile);
  const processedYaml = interpolateValue(yaml, 'stage', stage);

  return processedYaml;
}

function parseFile(filePath: string): Dictionary {
  const fileContents = fs.readFileSync(filePath, 'utf8');

  return YAML.parse(fileContents);
}