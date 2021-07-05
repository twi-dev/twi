if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "test"
}

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
