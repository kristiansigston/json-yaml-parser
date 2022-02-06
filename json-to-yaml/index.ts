type jsonStuff = {
  [key: string]: any;
};

export const getKeyProperties = (possibleObject: jsonStuff) => {
  if (typeof possibleObject !== "object" || possibleObject === null) {
    return false;
  }

  return Object.getOwnPropertyNames(possibleObject);
};

const leader = (key: string, offset: number): string => {
  const indent = createOffset(offset);
  return `${indent}${key}:\n`;
};

const createOffset = (offset: number) => {
  return new Array(offset)
    .fill(1)
    .map(() => "  ")
    .join("");
};

const yamlOutput = (
  object: jsonStuff,
  key: string,
  offset = 0,
  arrayValue = false
): string => {
  const arrayDash = arrayValue ? "- " : "";

  if (!getKeyProperties(object[key])) {
    let tabs = "";
    if (offset !== 0) {
      tabs = createOffset(offset);
    }

    const extension = arrayValue ? "" : `: ${object[key]}`;

    return `${tabs}${arrayDash}${key}${extension}`;
  }

  if (Array.isArray(object[key])) {
    const arrayValue = object[key]
      .map((key: any) => yamlOutput(object, key, offset, true))
      .join("\n");

    return leader(key, offset) + arrayValue;
  }

  if (typeof object[key] === "object") {
    const passedObject = object[key];
    const keys = Object.getOwnPropertyNames(passedObject);

    const objectValue = keys
      .map((key) => {
        return yamlOutput(passedObject, key, offset + 1, false);
      })
      .join("\n");

    return leader(key, offset) + objectValue;
  }
};

const jsonToYaml = (jsonData: string) => {
  try {
    JSON.stringify(jsonData);
  } catch (e) {
    throw new Error("Supplied data is not of type json. Or is malformed json");
  }
  let parsedJson = JSON.parse(jsonData);
  const keys: string[] = Object.getOwnPropertyNames(parsedJson);
  return keys.map((key) => yamlOutput(parsedJson, key)).join("\n");
};

export default jsonToYaml;
