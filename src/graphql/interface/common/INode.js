import {GraphQLID as TID} from "graphql"
import {Types} from "mongoose"

import Interface from "parasprite/Interface"

const isTypeOf = val => Types.ObjectId.isValid(val.id)

const INode = Interface("Node", "An object with an ID.")
  .field({name: "id", type: TID, required: true})
.end()

export default INode

export {isTypeOf}
