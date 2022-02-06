export const json = JSON.stringify({
  glossary: {
    title: "example glossary",
    GlossDiv: {
      title: "S",
      GlossList: {
        GlossEntry: {
          ID: "SGML",
          SortAs: "SGML",
          GlossTerm: "Standard Generalized Markup Language",
          Acronym: "SGML",
          Abbrev: "ISO 8879:1986",
          GlossDef: {
            para: "A meta-markup language, used to create markup languages such as DocBook.",
            GlossSeeAlso: ["GML", "XML"],
          },
          GlossSee: "markup",
          ANullValueJustForKicks: null,
        },
      },
    },
  },
});

export const yaml = `glossary:
  title: example glossary
  GlossDiv:
    title: S
    GlossList:
      GlossEntry:
        ID: SGML
        SortAs: SGML
        GlossTerm: Standard Generalized Markup Language
        Acronym: SGML
        Abbrev: ISO 8879:1986
        GlossDef:
          para: A meta-markup language, used to create markup languages such as DocBook.
          GlossSeeAlso:
          - GML
          - XML
        GlossSee: markup
        ANullValueJustForKicks: null`;

export const oneKeyJson = JSON.stringify({
  key: "value",
});

export const twoKeyJson = JSON.stringify({
  key1: "value1",
  key2: "value2",
});

export const arrayJson = JSON.stringify({
  key: ["yes", "not"],
});

export const jsonPropertyNull = JSON.stringify({
  thisIsNull: null,
});

export const oneKeyYaml = `key: value`;
export const twoKeyYaml = `key1: value1
key2: value2`;
export const arrayYaml = `key:
- yes
- not`;

export const yamlPropertyNull = `thisIsNull: null`;
