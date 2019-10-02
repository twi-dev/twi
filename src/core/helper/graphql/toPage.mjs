const {isArray} = Array

const extract = data => fn => fn(
  isArray(data) ? ({rows: data[0], count: data[1]}) : data
)

const toPage = ({limit, offset}) => extract(({rows, count}) => ({
  limit, offset, rows, count
}))

export default toPage
