import mongoose from "mongoose"

const {Query} = mongoose

const pagination = (cursor = 1, limit = 10) => query => {
  if (!(query instanceof Query)) {
    return query
  }

  const skip = limit * (cursor - 1)

  return query.skip(skip).limit(limit)
}

export default pagination
