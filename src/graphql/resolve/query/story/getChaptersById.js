import Chapter from "database/model/Chapter"

async function getChaptersById({chapters}, {cursor}) {
  chapters = await Chapter.getManyById(chapters, cursor)

  return chapters
}

export default getChaptersById
