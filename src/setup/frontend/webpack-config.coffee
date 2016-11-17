webpack = require "webpack"

config =
  output: filename: "common.js"
  resolve:
    extensions: ['', '.js', '.cjsx', '.coffee']
  module:
    loaders: [
      test: /\.(coffee|cjsx)$/, loaders: ["coffee", "cjsx"]
    ]
  plugins: [
    new webpack.HotModuleReplacementPlugin
  ]

module.exports = config
