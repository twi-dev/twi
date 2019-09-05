const toPage = ({limit, offset}) => ({rows, count}) => ({
  limit, offset, rows, count
})

export default toPage
