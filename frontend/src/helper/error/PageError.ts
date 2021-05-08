interface PageError extends Error {
  status: number

  statusCode: number
}

export default PageError
