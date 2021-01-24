import {GraphQLObjectType as Output} from "graphql"

import chapter from "server/api/schema/query/chapter"
import chapters from "server/api/schema/query/chapters"
// import sessions from "server/api/schema/query/sessions"
import stories from "server/api/schema/query/stories"
import story from "server/api/schema/query/story"
import user from "server/api/schema/query/user"
import users from "server/api/schema/query/users"
import viewer from "server/api/schema/query/viewer"

const TQuery = new Output({
  name: "Query",
  fields: {
    chapter,
    chapters,
    stories,
    story,
    user,
    users,
    viewer
  }
})

export default TQuery
