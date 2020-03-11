// tslint:disable:readonly-array

import AWS from 'aws-sdk';
import { Either, left, right } from 'fp-ts/lib/Either';

import { Options } from './cli';
import { Dictionary } from './dictionary';

function initCloudFormation(options: Options): AWS.CloudFormation {
  const { profile, region } = options;
  const credentials = new AWS.SharedIniFileCredentials({ profile });
  const config = {
    credentials,
    region
  };

  return new AWS.CloudFormation(config);
}

export async function fetchExports(
  options: Options, token?: null | string, results: any[] = []
): Promise<readonly AWS.CloudFormation.Export[] | undefined> {
  const cloudFormation = initCloudFormation(options)
  const params = token ? { NextToken: token } : {}

  const listExportsResult = await cloudFormation
    .listExports(params)
    .promise()
    .then(result => result)
    .catch(error => Promise.reject(error))

  const nextToken = listExportsResult.NextToken
  const exports = listExportsResult.Exports

  const updatedResults: any[] = results.concat(exports)

  return (nextToken) ?
    fetchExports(options, nextToken, updatedResults) :
    new Promise((resolve) => resolve(updatedResults))
}

export function replaceExportNamesWithValues(
  mappings: Dictionary,
  exports: readonly AWS.CloudFormation.Export[]
): Either<Error, Dictionary> {
  const result = Object.entries(mappings).reduce((acc, elem) => {
    const [primaryKey, primaryValue] = elem;
    const foundExport = exports.find(element => element.Name === primaryValue);

    return foundExport
      ? {
          ...acc,
          [primaryKey]: foundExport.Value || ''
        }
      : acc;
  }, {});

  return Object.keys(mappings).length === Object.keys(result).length
    ? right(result)
    : left(new Error('Not all keys could be found in CloudFormation exports.'));
}
