module.exports = {
  plugins: [
    ["module-resolver", {
      cwd: __dirname,
      root: ["src"]
    }],
    "@babel/transform-runtime",
    ["@babel/proposal-decorators", {
      legacy: true
    }],
    ["@babel/proposal-class-properties", {
      loose: true
    }],
    "@babel/proposal-async-generator-functions",
    "@babel/proposal-nullish-coalescing-operator",
    "@babel/proposal-optional-catch-binding",
    "@babel/proposal-optional-chaining",
    "@babel/proposal-export-namespace-from",
    "@babel/proposal-export-default-from",
    "@babel/proposal-do-expressions",
    ["@babel/proposal-pipeline-operator", {
      proposal: "minimal"
    }],
    ["@babel/transform-modules-commonjs", {
      mjsStrictNamespace: false
    }],
    ["@babel/proposal-object-rest-spread", {
      useBuiltIns: true
    }]
  ]
}
