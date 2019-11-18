import AWS from 'aws-sdk'

import { Options } from './cli'

function initCloudFormation(profile: string): AWS.CloudFormation {
  const credentials = new AWS.SharedIniFileCredentials({ profile });

  AWS.config.credentials = credentials;
  AWS.config.region = 'ap-southeast-2';

  return new AWS.CloudFormation();
}

export async function fetchExports(_mappings: any, options: Options) {
  const { profile } = options
  const cloudFormation = initCloudFormation(profile)

  await cloudFormation.listExports().promise()
}
