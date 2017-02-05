function babel(isDev) {
  const part = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        query: {
          presets: [
            "react"
          ],
          plugins: [
            "transform-es2015-modules-commonjs",
            "transform-async-to-generator",
            "transform-decorators-legacy",
            "transform-class-properties",
            "transform-async-generator-functions",
            "transform-exponentiation-operator",
            "transform-object-rest-spread",
            "transform-flow-strip-types"
          ]
        }
      }
    ]
  }

  if (isDev) {
    part.use = [
      {
        loader: "react-hot-loader/webpack"
      },
      ...part.use
    ]
  }

  return part
}

export default babel
