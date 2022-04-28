export const getKeyCount = (keySubstring: string, object) =>
  Object.keys(object).filter((objectKey: string) =>
    objectKey.includes(keySubstring)
  ).length;

export const capitalToCamelCase = (key: string) =>
  `${key.charAt(0).toLowerCase()}${key.slice(1)}`;

export const getOptionalName = (defaultName: string, optionalName?: string) => {
  return optionalName ? optionalName : defaultName;
};

export const createKeyName = (
  defaultName: string,
  object,
  optionalName?: string
) => {
  const keyName = getOptionalName(defaultName, optionalName);
  const count = getKeyCount(keyName, object);
  return `${keyName}${!!count ? count : ""}`;
};
