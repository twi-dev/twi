import utils from "loader-utils"
import isFunction from "lodash/isFunction"

function transformFileLoader(content, sourceMaps) {
  const cb = this.async()

  const emit = (name, code, map, ast) => {
    this.emitFile(name, code, map)
    cb(null, code, map, ast)
  }

  const query = utils.getOptions(this)

  const regExpr = query.regExpr

  const resource = this.resource
  const filename = this.resourcePath
  const interpolatedFilename = utils.interpolateName(this, query.name, {
    context: query.context, content
  })

  if (!isFunction(query.transform)) {
    return emit(interpolatedFilename, content, sourceMaps)
  }

  try {
    const res = query.transform({
      resource, filename, interpolatedFilename, content, sourceMaps, regExpr
    })

    if (res instanceof Promise) {
      return res
        .then(({content, sourceMaps}) => emit(content, sourceMaps))
        .catch(cb)
    }

    return emit(res.content, res.sourceMaps)
  } catch (err) {
    return cb(err)
  }
}

export default transformFileLoader
