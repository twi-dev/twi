module.exports = {
  // * This param was increased due to issues with test,
  // * likely caused by slow TS compilation with ts-node.
  // * I need to find a way to increase compilation speed by keep current path resolving strategy
  timeout: "2m",
  failFast: true,
  environmentVariables: {
    NODE_ENV: "test",
    TS_NODE_COMPILER: "ttypescript",
    TS_NODE_PROJECT: "tsconfig.json",
    TS_NODE_PREFER_TS_EXTS: "true"
  },
  extensions: [
    "ts"
  ],
  files: ["**/*.test.ts"],
  require: [
    "ts-node/register",
    "reflect-metadata",
    "./src/config.ts"
  ]
}
