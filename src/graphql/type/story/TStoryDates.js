import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

const TStoryDates = Type("StoryDates")
  .field("createdAt", TDateTime, "The date when story has been created.", true)
  .field("updatedAt", TDateTime, "The date of last story update.")
.end()

export default TStoryDates
