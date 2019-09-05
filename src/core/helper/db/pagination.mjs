const pagination = ({page = 1, limit = 10} = {}, params = {}) => {
  page < 1 && (page = 1)
  limit < 1 && (limit = 10)

  const offset = limit * (page - 1)

  return {...params, limit, offset, page}
}

export default pagination
