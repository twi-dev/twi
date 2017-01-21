cjsx = (isDev) ->
  part =
    test: /\.(cjsx|coffee|litcoffee|coffee\.md)$/
    exclude: /node_modules/
    use: [
      {
        loader: "coffee"
      }
      {
        loader: "cjsx"
      }
    ]

  if isDev
    part.use = [
      {
        loader: "react-hot-loader/webpack"
      }
      part.use...
    ]

  return part

module.exports = cjsx
