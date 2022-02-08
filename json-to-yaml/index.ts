type jsonStuff = {
  [key: string]: any;
};

export const getObjectProperties = (possibleObject: jsonStuff) => {
  if (typeof possibleObject !== "object" || possibleObject === null) {
    return false;
  }

  return Object.getOwnPropertyNames(possibleObject);
};

const objectPropertyName = (key: string, offset: number): string => {
  const indent = prefixIndentLength(offset);
  return `${indent}${key}:\n`;
};

const prefixIndentLength = (offset: number) => {
  let indent = "";

  for (let i = 0; i < offset; i++) {
    indent += "  ";
  }

  return indent;
};

const yamlOutput = (
  object: jsonStuff,
  key: string,
  offset = 0,
  arrayItem = false
): string => {
  // check if value is an object
  if (!getObjectProperties(object[key])) {
    let indent = "";
    let extension = "";
    let arrayItemDash = "";

    // do not indent root properties
    if (offset !== 0) {
      indent = prefixIndentLength(offset);
    }

    // add dash prefix to array items
    if (arrayItem) {
      arrayItemDash = "- ";
    }

    // add the object value if this is not an array item
    // array item keys or values will not have a property
    // on the same line. items that are also arrays or objects
    // will start listing these on the next line
    if (!arrayItem) {
      extension = `: ${object[key]}`;
    }

    return `${indent}${arrayItemDash}${key}${extension}`;
  }

  if (Array.isArray(object[key])) {
    const arrayValue = object[key]
      .map((key: any) => yamlOutput(object, key, offset, true))
      .join("\n");

    return objectPropertyName(key, offset) + arrayValue;
  }

  if (typeof object[key] === "object") {
    const passedObject = object[key];
    const keys = Object.getOwnPropertyNames(passedObject);

    const objectValue = keys
      .map((key) => {
        return yamlOutput(passedObject, key, offset + 1, false);
      })
      .join("\n");

    return objectPropertyName(key, offset) + objectValue;
  }

  throw new Error(`Mr programmer sir. You didn't handle this ${object[key]}`);
};

const jsonToYaml = (jsonData: string) => {
  try {
    JSON.stringify(jsonData);
  } catch (e) {
    throw new Error("Supplied data is not of type json. Or is malformed json");
  }

  const parsedJson = JSON.parse(jsonData);

  const keys: string[] = Object.getOwnPropertyNames(parsedJson);

  return keys.map((key) => yamlOutput(parsedJson, key)).join("\n");
};

export default jsonToYaml;
