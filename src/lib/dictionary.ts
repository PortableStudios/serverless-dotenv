export interface Dictionary {
  readonly [key: string]: string;
}

export function interpolateValue(
  dictionary: Dictionary,
  key: string,
  value: string
): Dictionary {
  return Object.entries(dictionary).reduce((acc, elem) => {
    const [primaryKey, primaryValue] = elem;
    return {
      ...acc,
      [primaryKey]: primaryValue.replace('${' + key + '}', value)
    };
  }, {});
}
