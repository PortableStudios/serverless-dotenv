import AWS from 'aws-sdk';

import { Options } from './cli';

function initCloudFormation(profile: string): AWS.CloudFormation {
  const credentials = new AWS.SharedIniFileCredentials({ profile });
  const region = 'ap-southeast-2';

  const config = {
    credentials,
    region
  };
  return new AWS.CloudFormation(config);
}

// tslint:disable-next-line
export async function fetchExports(_mappings: any, options: Options) {
  const { profile } = options;
  const cloudFormation = initCloudFormation(profile);

  return cloudFormation
    .listExports()
    .promise()
    .then(result => result.Exports)
    .catch(error => Promise.reject(error));
}
