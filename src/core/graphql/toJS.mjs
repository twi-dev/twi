import isFunction from "lodash/isFunction"

const isArray = Array.isArray

async function toJS(docs) {
  if (!isArray(docs)) {
    return isFunction(docs.toJS) ? docs.toJS() : docs
  }

  return Promise.all(docs.map(doc => isFunction(doc.toJS) ? doc.toJS() : doc))
}

export default toJS
