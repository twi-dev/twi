TWI_ROOT = do process.cwd

{extract} = require "extract-text-webpack-plugin"

{app: {theme}} = require "#{TWI_ROOT}/core/helper/util/configure"

stylus = (isDev) ->
  test: /\.styl$/
  exclude: /node_modules/
  loader: extract
    fallbackLoader: "style-loader"
    loader: [
      {
        loader: "css-loader"
        query:
          modules: yes
          camelCase: yes
          minimize: not isDev
          localIdentName: "[name]__[local]___[hash:base64:10]"
      }
      {
        loader: "stylus-loader"
        query:
          paths: [
            "#{TWI_ROOT}/theme/#{theme}/src/stylus/common"
          ]
      }
    ]

module.exports = stylus
