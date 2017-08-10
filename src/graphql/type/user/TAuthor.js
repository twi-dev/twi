import {GraphQLID as TID} from "graphql"
import Type from "parasprite/Type"

import TLogin from "../../scalar/user/TLogin"

import INode, {isTypeOf} from "../../interface/common/INode"

const TAuthor = Type(
  "Author", "Represends the main information about an author of this story",
  [INode], isTypeOf
)
  .field("id", TID, true)
  .field("login", TLogin, true)
.end()

export default TAuthor
