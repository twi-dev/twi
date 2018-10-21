import deprecate from "core/helper/decorator/deprecate"

/**
 * Creates a decorator methods to automatically call
 * an internal _tryConvert method
 */
function toObject(target, name, descriptor) {
  const method = descriptor.value

  descriptor.value = async function tryConvert(params = {}) {
    const docs = await method.call(this, params)

    return this._tryConvert(docs, params.options)
  }
}

export default toObject |> deprecate(
  "Will be removed in favor of toJS helper."
)
