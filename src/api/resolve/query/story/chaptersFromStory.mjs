import pagination from "core/helper/db/pagination"

const getChaptersFromStory = story => (
  story.chapters ?? story.getChapters(pagination())
)

export default getChaptersFromStory
