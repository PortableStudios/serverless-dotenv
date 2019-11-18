import { Options } from './cli'

export async function fetchExports(mappings: any, options: Options) {
  const { profile, stage } = options
  console.log(profile)
  console.log(stage)
  console.log(mappings)
}