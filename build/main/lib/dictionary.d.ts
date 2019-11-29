export interface Dictionary {
    readonly [key: string]: string;
}
export declare function interpolateValue(dictionary: Dictionary, key: string, value: string): Dictionary;
