module.exports = {
  failFast: true,
  environmentVariables: {
    NODE_ENV: "test",
    TS_NODE_PREFER_TS_EXTS: "true"
  },
  extensions: [
    "ts"
  ],
  files: ["**/*.test.ts"],
  require: [
    "ts-node/register/transpile-only",
    "reflect-metadata",
    "./src/config.ts"
  ]
}
