import isFunction from "lodash/isFunction"

const isArray = Array.isArray

const serializeDocument = doc => isFunction(doc.toJS) ? doc.toJS() : doc

async function serialize(docs) {
  if (!docs) {
    return docs
  }

  if (!isArray(docs)) {
    return serializeDocument(docs)
  }

  return Promise.all(docs.map(serializeDocument))
}

export default serialize
