import {GraphQLID as TID} from "graphql"
import Type from "parasprite/Type"

import TLogin from "../../scalar/user/TLogin"

const TAuthor = Type(
  "Author", "Represends the main information about an author of this story"
)
  .field("id", TID, true)
  .field("login", TLogin, true)
.end()

export default TAuthor
