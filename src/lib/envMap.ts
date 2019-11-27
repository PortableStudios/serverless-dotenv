import fs from 'fs';
import YAML from 'yaml';

import { Options } from './cli';
import { Dictionary, interpolateValue } from './dictionary';

export function findFile(options: Options): boolean {
  const { envMapFile } = options;

  // tslint:disable-next-line
  if (!fs.existsSync(envMapFile)) {
    throw new Error(
      `Cannot find ${envMapFile}. Please use option --envMapFile to provide the correct YAML file.`
    );
  }
  return true;
}

export function writeFile(mappings: any, options: Options): void {
  const { stage } = options;
  const envFile = `.env.${stage}`;

  const data = mappings;

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
