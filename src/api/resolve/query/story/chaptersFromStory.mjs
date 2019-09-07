import pagination from "core/helper/db/pagination"

const getChaptersFromStory = story => story.getChapters(pagination())

export default getChaptersFromStory
