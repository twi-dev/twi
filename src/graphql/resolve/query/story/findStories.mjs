import bind from "core/graphql/bindResolver"

import Story from "database/model/Story"

// TODO: Add a "filter" argument
const findStories = params => Story.findMany(params)

export default bind(findStories)
