import parseISO from "date-fns/parseISO"
import isString from "lodash/isString"
import toDate from "date-fns/toDate"

const serializeDate = name => parent => {
  const field = parent[name]

  if (field == null) {
    return field
  }

  return toDate(isString(field) ? parseISO(field) : field)
}

export default serializeDate
