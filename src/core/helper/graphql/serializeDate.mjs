import toDate from "date-fns/toDate"

const serializeDate = name => parent => toDate(parent[name])

export default serializeDate
