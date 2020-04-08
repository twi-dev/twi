const getPageInfo = ({page = 1, limit = 10} = {}, {maxLimit = 50} = {}) => {
  page < 1 && (page = 1)
  limit < 1 && (limit = 10)

  if (limit > maxLimit) {
    limit = maxLimit
  }

  const offset = limit * (page - 1)

  return {limit, offset, page}
}

export default getPageInfo
