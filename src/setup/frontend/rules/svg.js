const svg = () => ({
  test: /\.svg$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "babel-loader",
      query: {
        presets: [
          "es2015",
          "react"
        ]
      }
    },
    {
      loader: "react-svg-loader"
    }
  ]
})

export default svg
