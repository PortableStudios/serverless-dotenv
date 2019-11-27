export interface Dictionary {
  // tslint:disable-next-line
  [key: string]: string;
}

export function interpolateValue(
  dictionary: Dictionary,
  key: string,
  value: string
): Dictionary {
  for (const [primaryKey, primaryValue] of Object.entries(dictionary)) {
    // tslint:disable-next-line
    dictionary[primaryKey] = primaryValue.replace('${' + key + '}', value);
  }
  return dictionary;
}
