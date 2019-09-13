import parseISO from "date-fns/parseISO"
import toDate from "date-fns/toDate"

const serializeDate = name => parent => {
  const field = parent[name]

  return field == null ? field : field |> parseISO |> toDate
}

export default serializeDate
