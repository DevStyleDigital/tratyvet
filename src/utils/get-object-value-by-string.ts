export function getObjectValueByString<T extends Record<string, any>>(
  obj: T | undefined,
  path: string,
) {
  const keys = path.split('.');
  if (keys.length > 1) {
    let value = obj;
    for (const key of keys) {
      if (!value?.[key]) {
        value = undefined;
        break;
      }
      value = value?.[key];
    }
    return value;
  }

  return obj?.[keys[0]];
}
