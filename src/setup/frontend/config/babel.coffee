babel = (isDev) ->
  part = 
    test: /\.jsx?$/
    exclude: /node_modules/
    use: [
      {
        loader: "babel-loader"
        query:
          presets: [
            "es2015"
            "react"
          ]
          plugins: [
            "transform-decorators-legacy"
            "transform-class-properties"
            "transform-flow-strip-types"
          ]
      }
    ]

  part.use = [
    {
      loader: "react-hot-loader/webpack"
    }
    part.use...
  ]

  return part

module.exports = babel
