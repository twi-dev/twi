import isFunction from "lodash/isFunction"

const isArray = Array.isArray

const tryConvert = doc => isFunction(doc.toJS) ? doc.toJS() : doc

async function toJS(docs) {
  if (!docs) {
    return docs
  }

  if (!isArray(docs)) {
    return tryConvert(docs)
  }

  return Promise.all(docs.map(tryConvert))
}

export default toJS
