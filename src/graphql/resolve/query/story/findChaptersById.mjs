import Chapter from "database/model/Chapter"

function findChaptersById({chapters}, {cursor}) {
  return Chapter.getManyByIds(chapters, cursor)
}

export default findChaptersById
