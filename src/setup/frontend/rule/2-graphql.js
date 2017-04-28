const graphql = () => ({
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "emit-file-loader",
      options: {
        name: "dist/[path][name].[ext].js"
      }
    },
    "graphql-tag/loader"
  ]
})

export default graphql
