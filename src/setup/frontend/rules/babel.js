function babel(isDev) {
  const part = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        query: {
          presets: [
            "es2015",
            "react"
          ],
          plugins: [
            "transform-decorators-legacy",
            "transform-class-properties",
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
