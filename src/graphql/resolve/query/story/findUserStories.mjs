import Story from "database/model/Story"

async function findUserStories(author, {cursor}) {
  const stories = await Story.findManyByAuthor(author.id, cursor)

  return stories
}

export default findUserStories
