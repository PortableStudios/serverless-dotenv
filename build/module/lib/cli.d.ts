export interface Options {
    readonly stage: string;
    readonly profile: string;
    readonly envMapFile: string;
}
export declare function args(cliArgs: readonly string[]): Options;
export declare function createEnv(options: Options): Promise<any>;
