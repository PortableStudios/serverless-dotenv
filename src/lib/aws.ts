import { Options } from './cli';

export async function fetchExports(options: Options) {
  const { profile, stage } = options;
  console.log(profile, stage);
}