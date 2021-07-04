module.exports = {
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
