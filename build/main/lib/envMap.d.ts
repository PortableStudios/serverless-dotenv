import { Options } from './cli';
import { Dictionary } from './dictionary';
export declare function findFile(options: Options): Promise<boolean>;
export declare function writeFile(mappings: Dictionary, options: Options): void;
export declare function parseEnvMappings(options: Options): Dictionary;
