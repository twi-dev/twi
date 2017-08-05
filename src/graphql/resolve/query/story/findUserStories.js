import Story from "database/model/Story"

async function findUserStories(author, {cursor}) {
  const stories = await Story.getManyByAuthor(author.id, cursor)

  return stories
}

export default findUserStories
