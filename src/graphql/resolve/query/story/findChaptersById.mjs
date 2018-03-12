import Chapter from "database/model/Chapter"

async function findChaptersById({chapters}, {cursor}) {
  chapters = await Chapter.getManyById(chapters, cursor)

  return chapters
}

export default findChaptersById
