const react = () => ({
  test: /\.jsx?(\?[^?]*)?$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    babelrc: false,
    presets: ["react"],
    plugins: [
      "transform-es2015-modules-commonjs",
      "babel-plugin-transform-export-extensions"
    ]
  }
})

export default react
