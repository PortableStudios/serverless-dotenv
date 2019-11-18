import YAML from 'yaml'
import fs from 'fs'

import { Options } from './cli'
import { Dictionary, interpolateValue } from './dictionary'

export function findFile(options: Options) {
  const { envMapFile } = options

  if (!fs.existsSync(envMapFile)) {
    throw new Error(`Cannot find ${envMapFile}. Please use option --envMapFile to provide the correct YAML file.`)
  }
  return true
}

export function writeFile(mappings: any, options: Options) {
  const { stage } = options
  const envFile = `.env.${stage}`

  const data = mappings

  fs.writeFileSync(envFile, data)
}

export async function parseEnvMappings(options: Options) {
  const { envMapFile, stage } = options

  const yaml = parseFile(envMapFile)
  const processedYaml = interpolateValue(yaml, 'stage', stage)

  return processedYaml
}

function parseFile(filePath: string): Dictionary {
  const fileContents = fs.readFileSync(filePath, 'utf8')

  return YAML.parse(fileContents)
}