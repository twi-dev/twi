import isPlainObject from "lodash/isPlainObject"
import isArray from "lodash/isArray"
import isEmpty from "lodash/isEmpty"

import objectIterator from "objectIterator"

/**
 * Transform given state object to form-data
 *
 * @param object state
 *
 * @return FormData instance
 */
function toFormData(obj, rootKey) {
  const fd = new FormData()

  /**
   * Append object fields to FormData instance
   *
   * @param null|string key – parent field key
   * @param any value
   *
   * @api private
   */
  function append(key, value) {
    for (const [k, v] of objectIterator.entries(value)) {
      key = key ? `${key}[${k}]` : key

      if (isArray(v) || isPlainObject(v)) {
        isEmpty(v) ? append(key, v) : fd.append(key, v)
      } else {
        fd.append(key, v)
      }
    }
  }

  append(rootKey, obj)
  return fd
}

export default toFormData
