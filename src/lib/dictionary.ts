export type Dictionary = { [key: string]: string; }

export function interpolateValue(dictionary: Dictionary, key: string, value: string) {
  for (const [ _key, _value ] of Object.entries(dictionary)) {
    dictionary[_key] = _value.replace('${'+ key + '}', value)
  }
  return dictionary;
}