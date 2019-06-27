import toDate from "date-fns/toDate"

const serializeDate = name => parent => {
  const field = parent[name]

  return field == null ? field : toDate(field)
}

export default serializeDate
