import {readFileSync} from "fs"
import {resolve} from "path"

import {transform} from "babel-core"

const ROOT = process.cwd()

const BABERC = JSON.parse(readFileSync(resolve(ROOT, ".babelrc")))

const JSX_PATTERN = /\.jsx?$/

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

  const res = transform(String(content), {
    ...BABERC,
    comments: isDev
  })

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

export default babel
