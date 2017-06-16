const readFileSync = require("fs").readFileSync
const resolve = require("path").resolve

const transform = require("babel-core").transform

const assign = Object.assign

const ROOT = process.cwd()

const BABELRC = JSON.parse(readFileSync(resolve(ROOT, ".babelrc")))

const JSX_PATTERN = /\.jsx$/

const transformer = ({isDev}) => function(options) {
  const {interpolatedFilename, content, sourceMaps} = options

  if (!JSX_PATTERN.test(interpolatedFilename)) {
    return {
      filename: interpolatedFilename,
      content,
      sourceMaps
    }
  }

  const filename = interpolatedFilename.replace(JSX_PATTERN, ".js")

  const res = transform(String(content), assign({}, BABELRC, {
    comments: isDev
  }))

  return {
    filename,
    content: res.code,
    sourceMaps: res.map,
    ast: res.ast
  }
}

const babel = ({isDev}) => ({
  test: JSX_PATTERN,
  exclude: /node_modules/,
  loader: "transform-file-loader",
  options: {
    name: "dist/[path][name].[ext]",
    transformer: transformer({isDev})
  }
})

module.exports = babel
