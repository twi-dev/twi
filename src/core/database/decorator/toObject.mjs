function toObject(target, name, descriptor) {
  const fn = descriptor.value

  descriptor.value = async function tryConvert(params = {}) {
    const docs = await fn.call(this, params)

    return this._tryConvert(docs, params.options)
  }
}

export default toObject
