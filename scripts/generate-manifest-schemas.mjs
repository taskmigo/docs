import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const outputDirectory = fileURLToPath(new URL("../public/schemas/v0/", import.meta.url));
const schemaBase = "https://taskmigo.github.io/docs/schemas/v0";

const namePattern = "^[a-zA-Z0-9_-]+$";
const semanticVersionPattern =
  "^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)(?:-[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?(?:\\+[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?$";
const versionConstraintPattern =
  "^(?:[~^])?(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)(?:-[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?(?:\\+[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?$";

function referencePattern(kind) {
  return `^${kind}/[a-zA-Z0-9_-]+(?:@${versionConstraintPattern.slice(1, -1)})?$`;
}

function manifestSchema({ kind, imports, spec, definitions = {} }) {
  const filename = `${kind.split("/")[1]}.schema.json`;

  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: `${schemaBase}/${filename}`,
    title: `Taskmigo ${kind} manifest`,
    type: "object",
    additionalProperties: false,
    required: ["kind", "name", "spec"],
    properties: {
      kind: { const: kind, description: "The complete versioned manifest kind." },
      name: {
        type: "string",
        pattern: namePattern,
        description: "The resource name.",
      },
      version: {
        type: "string",
        pattern: semanticVersionPattern,
        description: "An optional immutable Semantic Version tag for this revision.",
      },
      imports,
      spec,
    },
    ...(Object.keys(definitions).length > 0 ? { $defs: definitions } : {}),
  };
}

const pageReference = {
  type: "string",
  pattern: referencePattern("v0/page"),
  description: "A v0/page resource reference, optionally followed by a version constraint.",
};

const applicationReference = {
  type: "string",
  pattern: referencePattern("v0/application"),
  description: "A v0/application resource reference, optionally followed by a version constraint.",
};

const emptyImports = {
  type: "array",
  maxItems: 0,
  description: "This manifest kind cannot import resources.",
};

const schemas = {
  "site.schema.json": manifestSchema({
    kind: "v0/site",
    imports: {
      type: "array",
      uniqueItems: true,
      items: applicationReference,
      description: "Unique v0/application references available to the Site.",
    },
    spec: {
      type: "object",
      additionalProperties: false,
      required: ["brand", "applications"],
      properties: {
        brand: {
          type: "object",
          additionalProperties: false,
          required: ["label", "logo", "favicon"],
          properties: {
            label: { type: "string", minLength: 1, description: "The displayed Site label." },
            logo: { type: "string", minLength: 1, description: "The Site logo path." },
            favicon: { type: "string", minLength: 1, description: "The Site favicon path." },
          },
        },
        applications: {
          type: "array",
          uniqueItems: true,
          items: { type: "string", pattern: namePattern },
          description: "Application names to expose, in display order.",
        },
      },
    },
  }),
  "application.schema.json": manifestSchema({
    kind: "v0/application",
    imports: {
      type: "array",
      minItems: 1,
      uniqueItems: true,
      items: pageReference,
      description: "Unique v0/page references available to the Application.",
    },
    spec: {
      type: "object",
      additionalProperties: false,
      required: ["icon", "label", "description", "path", "routes"],
      properties: {
        icon: {
          type: "string",
          format: "uri",
          pattern: "^[A-Za-z][A-Za-z0-9+.-]*://[^/\\s]+",
          description: "An absolute image URL with a scheme and host.",
        },
        label: { type: "string", minLength: 1, description: "A Trans expression." },
        description: { type: "string", minLength: 1, description: "A Trans expression." },
        path: { type: "string", pattern: "^/", description: "The Application path." },
        routes: {
          type: "array",
          minItems: 1,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["page", "path"],
            properties: {
              page: pageReference,
              path: {
                type: "string",
                pattern: "^/",
                description: "A path relative to the Application path.",
              },
            },
          },
        },
      },
    },
  }),
  "page.schema.json": manifestSchema({
    kind: "v0/page",
    imports: emptyImports,
    spec: {
      type: "object",
      additionalProperties: false,
      required: ["meta", "body"],
      properties: {
        meta: {
          type: "object",
          additionalProperties: false,
          required: ["title", "description"],
          properties: {
            title: { type: "string", description: "The page title or a Trans expression." },
            description: {
              type: "string",
              description: "The page description or a Trans expression.",
            },
          },
        },
        body: {
          type: "array",
          items: { $ref: "#/$defs/componentNode" },
          description: "The ordered list of root component nodes.",
        },
      },
    },
    definitions: {
      componentNode: {
        oneOf: [{ $ref: "#/$defs/stack" }, { $ref: "#/$defs/typography" }],
      },
      reactNode: {
        oneOf: [
          { type: "string" },
          { $ref: "#/$defs/componentNode" },
          {
            type: "array",
            items: { oneOf: [{ type: "string" }, { $ref: "#/$defs/componentNode" }] },
          },
        ],
      },
      stack: {
        type: "object",
        additionalProperties: false,
        required: ["component", "children"],
        properties: {
          component: { const: "Stack" },
          props: {
            type: "object",
            propertyNames: { pattern: "^data-" },
            additionalProperties: true,
          },
          children: { $ref: "#/$defs/reactNode" },
        },
      },
      typography: {
        type: "object",
        additionalProperties: false,
        required: ["component", "props", "children"],
        properties: {
          component: { const: "Typography" },
          props: {
            type: "object",
            additionalProperties: false,
            required: ["variant"],
            properties: {
              variant: { enum: ["h1", "h2", "h3", "h4", "h5", "h6", "span", "p"] },
            },
          },
          children: { type: "string" },
        },
      },
    },
  }),
  "translation.schema.json": manifestSchema({
    kind: "v0/translation",
    imports: emptyImports,
    spec: {
      type: "object",
      additionalProperties: false,
      required: ["locale", "content"],
      properties: {
        locale: {
          type: "string",
          minLength: 1,
          description: "A normalized BCP 47 locale.",
        },
        content: {
          type: "object",
          propertyNames: { minLength: 1 },
          additionalProperties: { $ref: "#/$defs/contentValue" },
          description: "The locale catalog contribution.",
        },
      },
    },
    definitions: {
      contentValue: {
        oneOf: [
          { type: ["string", "number", "boolean", "null"] },
          {
            type: "array",
            items: { $ref: "#/$defs/contentValue" },
          },
          {
            type: "object",
            propertyNames: { minLength: 1 },
            additionalProperties: { $ref: "#/$defs/contentValue" },
          },
        ],
      },
    },
  }),
};

await mkdir(outputDirectory, { recursive: true });

await Promise.all(
  Object.entries(schemas).map(([filename, schema]) =>
    writeFile(`${outputDirectory}${filename}`, `${JSON.stringify(schema, null, 2)}\n`),
  ),
);

console.log(`Generated ${Object.keys(schemas).length} manifest schemas in ${outputDirectory}`);
