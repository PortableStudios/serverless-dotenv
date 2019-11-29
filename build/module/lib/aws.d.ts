import AWS from 'aws-sdk';
import { Either } from 'fp-ts/lib/Either';
import { Options } from './cli';
import { Dictionary } from './dictionary';
export declare function fetchExports(options: Options): Promise<readonly AWS.CloudFormation.Export[] | undefined>;
export declare function replaceExportNamesWithValues(mappings: Dictionary, exports: readonly AWS.CloudFormation.Export[]): Either<Error, Dictionary>;
