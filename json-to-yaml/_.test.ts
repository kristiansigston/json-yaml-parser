import {
  json,
  yaml,
  oneKeyJson,
  oneKeyYaml,
  twoKeyJson,
  twoKeyYaml,
  arrayYaml,
  arrayJson,
  jsonPropertyNull,
  yamlPropertyNull,
} from "../test_data";
import jsonToYaml, { getObjectProperties } from "./";

describe("convert the json data to yaml", () => {
  it("should convert 1 key value pair correctl;y", () => {
    expect(jsonToYaml(oneKeyJson)).toEqual(oneKeyYaml);
  });

  it("should convert 2 key value pair correctl;y", () => {
    expect(jsonToYaml(twoKeyJson)).toEqual(twoKeyYaml);
  });

  it("should convert an array correctl;y", () => {
    expect(jsonToYaml(arrayJson)).toEqual(arrayYaml);
  });

  it("should convert the json to yaml correctly", () => {
    expect(jsonToYaml(json)).toEqual(yaml);
  });

  it("should handle null", () => {
    expect(jsonToYaml(jsonPropertyNull)).toEqual(yamlPropertyNull);
  });
});

describe("Errors", () => {
  it("should throw an error if the json is invalid", () => {
    expect(() => jsonToYaml('badJson: "badJson"')).toThrow();
  });
});

describe("Get all current root key values ", () => {
  it("should return the key properties", () => {
    expect(getObjectProperties({ yo: "lo", propThings: "hah ah a" })).toEqual([
      "yo",
      "propThings",
    ]);
  });
});
