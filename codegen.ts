import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    "https://europe-west1-lasertag-test.cloudfunctions.net/graphql/PEXwvC",
  documents: "src/graphql/**/*.ts",
  generates: {
    "src/graphql/types/graphql.ts": {
      preset: "client",
      plugins: [],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
