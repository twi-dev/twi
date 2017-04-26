const ROOT = process.cwd()

const resolve = () => ({
  test: /\.jsx?(\?[^?]*)?$/,
  loader: "babel-loader",
  exclude: /node_modules/,
  options: {
    babelrc: false,
    plugins: [
      "transform-es2015-modules-commonjs",
      "babel-plugin-transform-export-extensions",
      ["module-resolver", {
        cwd: ROOT,
        alias: {
          frontend: "./frontend"
        }
      }]
    ]
  }
})

export default resolve
