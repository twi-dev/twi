const toPage = ({limit, offset, page}) => ({rows, count}) => ({
  limit, offset, rows, count, page
})

export default toPage
