import {extract} from "extract-text-webpack-plugin"

const ROOT = process.cwd()

const stylus = isDev => ({
  test: /\.styl$/,
  exclude: /node_modules/,
  loader: extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
        query: {
          modules: true,
          camelCase: true,
          minimize: !isDev,
          localIdentName: "[name]__[local]___[hash:base64:10]"
        }
      },
      {
        loader: "stylus-loader",
        query: {
          paths: [
            `${ROOT}/frontend/stylus`
          ]
        }
      }
    ]
  })
})

export default stylus
