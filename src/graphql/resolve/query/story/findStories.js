import Story from "database/model/Story"

// TODO: Add a "filter" argument
const findStories = (_, {cursor}) => Story.findMany(cursor)

export default findStories
