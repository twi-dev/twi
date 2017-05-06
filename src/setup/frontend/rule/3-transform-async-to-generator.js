const babel = () => ({
  test: /\.jsx?(\?[^?]*)?$/,
  loader: "babel-loader",
  options: {
    babelrc: false,
    plugins: [
      "syntax-jsx",
      "syntax-decorators",
      "syntax-async-functions",
      "syntax-class-properties",
      "syntax-object-rest-spread",
      "transform-export-extensions",
      "transform-async-to-generator"
    ]
  }
})

export default babel
