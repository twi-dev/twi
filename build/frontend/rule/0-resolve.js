const ROOT = process.cwd()

const resolve = () => ({
  test: /\.jsx?(\?[^?]*)?$/,
  loader: "babel-loader",
  exclude: /node_modules/,
  options: {
    babelrc: false,
    plugins: [
      "syntax-jsx",
      "syntax-decorators",
      "syntax-async-functions",
      "syntax-class-properties",
      "syntax-object-rest-spread",
      "transform-export-extensions",
      ["module-resolver", {
        cwd: ROOT,
        alias: {
          frontend: "./frontend",
          "iterator/sync": "./system/helper/iterator/sync"
        }
      }]
    ]
  }
})

module.exports = resolve
